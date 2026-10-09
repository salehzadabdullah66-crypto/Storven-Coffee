/**
 * Storven Coffee - Hyper-Realistic Fluid Steam Engine
 * محرك البخار الواقعي السينمائي فائق الدقة باستخدام تقنية GLSL Fluid Steam Shaders
 * بخار حقيقي، ناعم، حريري، متصاعد من قلب فنجان القهوة بدون أي نقاط أو دوائر
 */

class StorvenCoffeeSteamScene {
    constructor(containerId, canvasId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.getElementById(canvasId);
        if (!this.container || !this.canvas) return;

        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = new THREE.Clock();

        this.steamMaterial = null;
        this.steamMaterial2 = null;
        this.steamGroup = null;

        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.cupWrap = document.getElementById('hero-cup-3d-wrap');

        this.init();
    }

    init() {
        const width = this.container.clientWidth || 580;
        const height = this.container.clientHeight || 640;

        // 1. المشهد والكاميرا
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        this.camera.position.set(0, 0.1, 5.5);

        // 2. مصيّر WebGL
        try {
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance'
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        } catch (e) {
            console.warn('WebGL init failed:', e);
            return;
        }

        // 3. بناء خامة وتأثير البخار الواقعي (Fluid Shader Steam)
        this.createPhotorealisticSteam();

        // 4. ربط أحداث التفاعل
        this.bindEvents();

        // 5. بدء حلقة التصيير
        this.animate();
    }

    createPhotorealisticSteam() {
        this.steamGroup = new THREE.Group();
        this.scene.add(this.steamGroup);

        // كود الـ Shaders الخاص بمحاكاة البخار الحقيقي
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            uniform float uSpeed;
            uniform float uOpacity;
            uniform vec3 uColor;
            varying vec2 vUv;

            // دالة تشويش طبيعية عالية الأداء
            float hash(vec2 p) {
                p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
                return -1.0 + 2.0 * fract(17.0 * fract(p.x * p.y * (p.x + p.y)));
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                           mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
            }

            // حركة تموج دخاني متعدد الطبقات (Fractional Brownian Motion)
            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                mat2 rot = mat2(cos(0.55), sin(0.55), -sin(0.55), cos(0.55));
                for (int i = 0; i < 5; ++i) {
                    v += a * noise(p);
                    p = rot * p * 2.05 + vec2(0.12, 0.18);
                    a *= 0.5;
                }
                return v;
            }

            void main() {
                vec2 uv = vUv;

                // تيار صعود البخار
                float t = uTime * uSpeed;

                // التواء التيارات الهوائية الحقيقي (Domain Warping)
                vec2 q = vec2(
                    fbm(uv * 2.2 + vec2(0.0, -t * 0.7)),
                    fbm(uv * 2.2 + vec2(4.2, -t * 0.6))
                );

                vec2 r = vec2(
                    fbm(uv * 2.8 + 3.0 * q + vec2(1.7, -t * 0.85)),
                    fbm(uv * 2.8 + 3.0 * q + vec2(8.3, -t * 0.75))
                );

                float smoke = fbm(uv * 3.2 + 3.5 * r + vec2(0.0, -t * 1.05));
                smoke = smoothstep(-0.2, 0.75, smoke);

                // شكل تيار البخار: ينطلق بدقة من فوهة الفنجان من الأعلى ويتسع ويتلاشى بنعومة صعوداً
                float waft = sin(uv.y * 3.0 + uTime * 0.7) * 0.07 * uv.y;
                float centerX = 0.50 + waft;
                float currentWidth = 0.16 + uv.y * 0.38;
                float distFromCenter = abs(uv.x - centerX);

                // تلاشي الحواف الأفقية
                float hMask = smoothstep(currentWidth, currentWidth * 0.15, distFromCenter);

                // تلاشي رأسي: يبدأ حصراً من فوهة الفنجان عند القاع ويتلاشى تماماً في الأعلى
                float vMask = smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.55, uv.y);

                float alpha = smoke * hMask * vMask * uOpacity;

                gl_FragColor = vec4(uColor, alpha);
            }
        `;

        // الطبقة الرئيسية للبخار
        this.steamMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: 0.32 },
                uOpacity: { value: 0.48 },
                uColor: { value: new THREE.Color(0xfcf7ed) }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending
        });

        // الطبقة الثانوية (لإعطاء عمق وكثافة واقعية للبخار المتصاعد)
        this.steamMaterial2 = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 10.0 },
                uSpeed: { value: 0.26 },
                uOpacity: { value: 0.30 },
                uColor: { value: new THREE.Color(0xf5eedb) }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending
        });

        const geom = new THREE.PlaneGeometry(3.2, 3.6);

        // وضع مسطح البخار ليبدأ حصراً وفوق فوهة الفنجان ويتصاعد للأعلى فقط بدون أي دخان على جسم الفنجان
        // فوهة الفنجان تقع عند Y = +0.22، ومع ارتفاع 3.6 يكون مركز المسطح عند: 0.22 + 1.8 = 2.02
        const mesh1 = new THREE.Mesh(geom, this.steamMaterial);
        mesh1.position.set(-0.06, 2.02, 0.2);
        this.steamGroup.add(mesh1);

        const mesh2 = new THREE.Mesh(geom, this.steamMaterial2);
        mesh2.position.set(-0.03, 2.06, 0.15);
        mesh2.scale.set(1.05, 1.02, 1.0);
        this.steamGroup.add(mesh2);
    }

    bindEvents() {
        const onMouseMove = (e) => {
            const rect = this.container.getBoundingClientRect();
            const clientX = e.clientX - rect.left;
            const clientY = e.clientY - rect.top;

            this.mouse.targetX = (clientX / rect.width) * 2 - 1;
            this.mouse.targetY = -(clientY / rect.height) * 2 + 1;
        };

        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', onMouseMove);
            heroSection.addEventListener('mouseleave', () => {
                this.mouse.targetX = 0;
                this.mouse.targetY = 0;
            });
        }

        window.addEventListener('resize', () => {
            if (!this.container || !this.renderer || !this.camera) return;
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            if (width === 0 || height === 0) return;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = Math.min(this.clock.getDelta(), 0.05);
        const time = this.clock.getElapsedTime();

        // تنعيم حركة الماوس للطفو ثلاثي الأبعاد
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        // إمالة الفنجان ثلاثية الأبعاد بمرونة ناعمة وطبيعية
        if (this.cupWrap && !this.reducedMotion) {
            const tiltX = -this.mouse.y * 6;
            const tiltY = this.mouse.x * 8;
            const floatPixel = Math.sin(time * 1.2) * 5;
            this.cupWrap.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${floatPixel}px)`;
        }

        // تحديث متغيرات زمن البخار في الشيدر
        if (this.steamMaterial && !this.reducedMotion) {
            this.steamMaterial.uniforms.uTime.value = time;
        }
        if (this.steamMaterial2 && !this.reducedMotion) {
            this.steamMaterial2.uniforms.uTime.value = time;
        }

        // تصيير المشهد
        this.renderer.render(this.scene, this.camera);
    }
}

// تشغيل المشهد فور اكتمال تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        new StorvenCoffeeSteamScene('hero-visual-container', 'coffee-splash-canvas');
    }
});
