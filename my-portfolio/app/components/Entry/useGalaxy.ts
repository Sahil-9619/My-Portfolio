"use client";

import { useEffect } from "react";

export const useGalaxy = (canvasRef, enteringRef) => {
    useEffect(() => {
        let renderer, scene, camera, animationId;
        let galaxy;
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const initThreeJS = () => {
            if (!window.THREE || scene) return;

            const THREE = window.THREE;

            if (!canvasRef.current) return;

            // Scene
            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x0a0f1a, 0.015);

            // Camera
            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 25;
            camera.position.y = 12;

            // Renderer
            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                alpha: true,
                antialias: true,
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Galaxy
            const generateGalaxy = () => {
                const particleCount = 20000;

                const positions = new Float32Array(particleCount * 3);
                const colors = new Float32Array(particleCount * 3);

                const colorInside = new THREE.Color(0xffffff);
                const colorOutside = new THREE.Color(0x2563eb);

                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;

                    const radius = Math.random() * 35;
                    const spinAngle = radius * 0.4;
                    const branchAngle = (i % 4) / 4 * Math.PI * 2;

                    const randomX =
                        Math.pow(Math.random(), 3) *
                        (Math.random() < 0.5 ? 1 : -1) *
                        0.6 *
                        radius;

                    const randomY =
                        Math.pow(Math.random(), 3) *
                        (Math.random() < 0.5 ? 1 : -1) *
                        0.3 *
                        radius;

                    const randomZ =
                        Math.pow(Math.random(), 3) *
                        (Math.random() < 0.5 ? 1 : -1) *
                        0.6 *
                        radius;

                    positions[i3] =
                        Math.cos(branchAngle + spinAngle) * radius + randomX;

                    positions[i3 + 1] = randomY;

                    positions[i3 + 2] =
                        Math.sin(branchAngle + spinAngle) * radius + randomZ;

                    const mixedColor = colorInside
                        .clone()
                        .lerp(colorOutside, radius / 35);

                    colors[i3] = mixedColor.r;
                    colors[i3 + 1] = mixedColor.g;
                    colors[i3 + 2] = mixedColor.b;
                }

                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute(
                    "position",
                    new THREE.BufferAttribute(positions, 3)
                );
                geometry.setAttribute(
                    "color",
                    new THREE.BufferAttribute(colors, 3)
                );

                const material = new THREE.PointsMaterial({
                    size: 0.08,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.9,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                });

                galaxy = new THREE.Points(geometry, material);
                galaxy.rotation.x = Math.PI * 0.1;

                scene.add(galaxy);
            };

            generateGalaxy();

            // Mouse
            const onMouseMove = (e) => {
                mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
                mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
            };

            document.addEventListener("mousemove", onMouseMove);

            // Resize
            const onResize = () => {
                camera.aspect =
                    window.innerWidth / window.innerHeight;

                camera.updateProjectionMatrix();
                renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                );
            };

            window.addEventListener("resize", onResize);

            const clock = new THREE.Clock();

            const animate = () => {
                animationId = requestAnimationFrame(animate);

                const elapsedTime = clock.getElapsedTime();

                targetX = mouseX * 0.8;
                targetY = mouseY * 0.8;

                camera.position.x +=
                    (targetX - camera.position.x) * 0.02;

                camera.position.y +=
                    (-targetY + 12 - camera.position.y) * 0.02;

                camera.lookAt(scene.position);

                if (enteringRef.current) {
                    camera.position.z -= 0.6;
                    camera.position.y -= 0.2;

                    galaxy.rotation.y += 0.015;

                    if (galaxy.material.opacity > 0) {
                        galaxy.material.opacity -= 0.01;
                    }
                } else {
                    galaxy.rotation.y = elapsedTime * 0.03;
                }

                renderer.render(scene, camera);
            };

            animate();

            return () => {
                cancelAnimationFrame(animationId);
                renderer?.dispose();
                scene?.clear();
            };
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
    }, []);
};