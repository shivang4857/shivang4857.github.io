import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
import profileImage from '../../assets/profile2.png';
//import blackholeVideo from '../../assets/blackhole.webm';

const About = () => {
  return (
    <>
    
    <div className="relative w-full" id="about-me">
      
          <section
        id="about"
        className="relative z-20 py-4 px-[7vw] md:px-[7vw] lg:px-[10vw] font-sans mt-16 md:mt-24 lg:mt-32"
      >
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-28">
          {/* Left */}
          <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              Hello I am ,
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Shivang Dwivedi
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec] leading-tight">
              <span className="text-white">I am a </span>
              <ReactTypingEffect
                text={[
                  'DevOps Engineer',
                  'Cloud Infra Engineer',
                  'Full Stack Developer',
                ]}
                speed={100}
                eraseSpeed={50}
                typingDelay={500}
                eraseDelay={2000}
                cursorRenderer={cursor => (
                  <span className="text-[#8245ec]">{cursor}</span>
                )}
              />
            </h3>
            <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
              I am a Cloud Infrastructure Engineer, DevOps specialist, and Full-Stack Developer with expertise in building scalable,
              efficient, and modern solutions.
            </p>
            <a
              href="https://drive.google.com/file/d/1_pLl2wjYVCU-wnqXIhjhYr0YC0SJXvwv/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                text-white
                bg-gradient-to-r from-[#6b21a8]/80 to-[#9333ea]/80
                py-3 px-10
                rounded-xl
                mt-5
                text-lg font-semibold
                backdrop-blur-sm
                shadow-lg shadow-purple-900/30
                transition-all duration-300
                hover:from-[#6b21a8]/100 hover:to-[#9333ea]/100
                hover:shadow-none
                hover:opacity-90
              "
            >
              DOWNLOAD CV
            </a>
          </div>

          {/* Right */}
          <div className="hidden md:flex md:w-1/2 justify-center md:justify-end z-40 ">
            <Tilt
              className="w-80 h-80 sm:w-96 sm:h-96 md:w-[36rem] md:h-[38rem] rounded-2xl z-50"
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              gyroscope={true}
            >
              <img
                src={profileImage}
                alt="Shivang Dwivedi"
                className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
              />
            </Tilt>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
