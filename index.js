
(document.onload = () => {
  gsap.registerPlugin(ScrollTrigger);
  const nav = document.querySelector('nav.floating_nav');
  const bars = gsap.utils.toArray('nav.floating_nav .background div');
  const closer = document.querySelector('.nav_closer');

  const headerTl = gsap.timeline();

  headerTl.add(initFloatingNav, 0);

  // Intro andimation and Floating animation are the same
  function initFloatingNav() {

    bars.forEach( bar => {
      gsap.set(bars, {
        background() {
          return bar.dataset.background;
        },
        color: 'transparent',
      });
    });

    gsap.to(bars, {
      color: 'white',
      delay: 0.8,
      stagger: 0.333,
      ease: 'Sine.InOut'
    });

    gsap.to(bars, {
      y: '100%',
      delay: 4.6666,
      stagger: {
        amount: 0.666,
      },
      ease: 'Sine.InOut',
      onComplete: () => {
        gsap.set(nav, {
          display: 'none',
        });

        setTimeout(() => {
          bars.forEach( bar => {
            gsap.set(bars, {
              color: 'transparent',
            });
          });
        }, 100);
      }
    });
    
    document.querySelector('body').addEventListener('click', (e) => {
      if(e.target.className.includes('nav_toggler')) {
        return floatingNavTween(e);
      }
    });

  }

  function floatingNavTween(e) {
    gsap.to(closer, {
      opacity() {
        if(e.target.className.includes('fa')) {
          return 0;
        } else {
          return 1;
        }
      },
      delay() {
        if(e.target.className.includes('fa')) {
          return 0;
        } else {
          return 1.8;
        }  
      },
      ease: 'Power.Out'
    });

    gsap.set(nav, {
      display: 'block',
    });

    if(e.target.className.includes('fa'))  {
      return gsap.to(bars, {
        y: '100%',
        stagger: {
          each: 0.075,
          from: 'end',
        },
        ease: 'Steps.In',
        onComplete() {
          if(e.target.className.includes('fa')) {
            gsap.set(nav, {
              display: 'none',
            });
          }
        }
      });
    } else {
      gsap.to(bars, {
        y:  0,
        stagger: {
          each: 0.1,
        },
        ease: 'Steps.In',
        onComplete() {
          if(e.target.className.includes('fa')) {
            gsap.set(nav, {
              display: 'none',
            });
          }
        }
      });
    }
  
    gsap.to(bars, {
      delay: 0.175,
      stagger: {
        each: 0.1
      }
    });

  }

  headerTl.play();
})();