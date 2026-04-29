"use client";

import { useEffect } from "react";
import * as THREE from "three";

declare global {
    interface Window {
        THREE?: typeof THREE;
    }
}

export const useBackground = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    useEffect(() => {


        let renderer: THREE.WebGLRenderer | undefined;
        let scene: THREE.Scene | undefined;
        let camera: THREE.PerspectiveCamera | undefined;
        let animationId: number | undefined;

        const handleResize = () => {
            if (!renderer || !camera) return;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        let targetScroll = 0;
        let currentScroll = 0;
        let mouseX = 0;
        let mouseY = 0;
        const shards: THREE.Mesh[] = [];
        let flightCurve: THREE.CatmullRomCurve3;

        const initThreeJS = () => {
            if (!window.THREE || scene) return;
            const THREE = window.THREE;

            if (!canvasRef.current) return;

            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x050505, 0.015);

            camera = new THREE.PerspectiveCamera(
                55,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                alpha: false, // 🔥 IMPORTANT
                antialias: true,
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x050505, 1);
            // 🔥 CURVE
            const curvePoints = [];
            for (let i = 0; i < 25; i++) {
                curvePoints.push(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 80,
                        (Math.random() - 0.5) * 60,
                        -i * 50
                    )
                );
            }

            curvePoints[0].set(0, 0, 10);
            curvePoints[1].set(0, 0, -20);

            flightCurve = new THREE.CatmullRomCurve3(curvePoints);

            // 🔥 SHARDS
            const geometry = new THREE.OctahedronGeometry(1, 0);

            const material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color("#00fff7"),  // blue glow
                emissive: 0x1e293b,
                emissiveIntensity: 0.6,
                metalness: 1,
                roughness: 0.15,
                clearcoat: 1,
                clearcoatRoughness: 0.05,
                flatShading: true,
            });

            for (let i = 0; i < 600; i++) {
                const mesh = new THREE.Mesh(geometry, material);

                const t = Math.random();
                const point = flightCurve.getPointAt(t);

                const offset = 30 + Math.random() * 40;
                const angle = Math.random() * Math.PI * 2;

                mesh.position.set(
                    point.x + Math.cos(angle) * offset,
                    point.y + Math.sin(angle) * offset,
                    point.z + (Math.random() - 0.5) * 20
                );

                mesh.scale.set(
                    2 + Math.random() * 5,
                    5 + Math.random() * 15,
                    2 + Math.random() * 5
                );

                mesh.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );

                mesh.userData = {
                    rx: (Math.random() - 0.5) * 0.01,
                    ry: (Math.random() - 0.5) * 0.01,
                    rz: (Math.random() - 0.5) * 0.01,
                };

                scene.add(mesh);
                shards.push(mesh);
            }

            // LIGHT
            scene.add(new THREE.AmbientLight(0xffffff, 0.4));

            const light1 = new THREE.PointLight(0xffffff, 4, 150);
            const light2 = new THREE.PointLight(0x88aaff, 5, 200);

            scene.add(light1, light2);

            // EVENTS
            window.addEventListener("scroll", () => {
                targetScroll = window.scrollY;
            });

            window.addEventListener("mousemove", (e) => {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            });

            // ANIMATE
            const animate = () => {
                if (!renderer || !scene || !camera) return;

                animationId = requestAnimationFrame(animate);

                currentScroll += (targetScroll - currentScroll) * 0.05;

                const maxScroll = window.innerHeight * 7;
                let t = currentScroll / maxScroll;
                t = Math.max(0, Math.min(t, 0.98));

                const pos = flightCurve.getPointAt(t);
                const look = flightCurve.getPointAt(Math.min(t + 0.02, 1));

                camera.position.set(
                    pos.x + mouseX * 5,
                    pos.y + mouseY * 5,
                    pos.z
                );

                camera.lookAt(
                    look.x + mouseX * 5,
                    look.y + mouseY * 5,
                    look.z
                );

                light1.position.set(pos.x + 10, pos.y + 10, pos.z - 20);
                light2.position.set(pos.x - 20, pos.y - 10, pos.z - 40);

                shards.forEach((s) => {
                    s.rotation.x += s.userData.rx;
                    s.rotation.y += s.userData.ry;
                    s.rotation.z += s.userData.rz;
                });

                renderer.render(scene, camera);
            };

            animate();

            window.addEventListener("resize", handleResize);
            handleResize();

        };

        if (!window.THREE) {
            const script = document.createElement("script");
            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
            script.onload = initThreeJS;
            document.body.appendChild(script);
        } else {
            initThreeJS();
        }
        return () => {
            if (animationId !== undefined) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener("resize", handleResize);
        };

    }, []);
};