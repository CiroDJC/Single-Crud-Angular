import { Component } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Single-Crud';
  id = "tsparticles";

    /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
    particlesUrl = "http://foo.bar/particles.json";

    /* or the classic JavaScript object */
    particlesOptions = {
        background: {
            color: {
                value: "#232741",    
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: ClickMode.push,
                },
                onHover: {
                    enable: true,
                    mode: HoverMode.repulse,
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            
            collisions: {
                enable: true,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.bounce,
                },
                random: false,
                speed: 6,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.1,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    };

    particlesLoaded(container: Container): void {
        console.log(container);
    }

    async particlesInit(engine: Engine): Promise<void> {
        console.log(engine);

        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }
}
