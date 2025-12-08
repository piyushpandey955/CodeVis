import { motion } from 'framer-motion';
import { 
  Sparkles, 
  GraduationCap, 
  Lightbulb, 
  Heart,
  BookOpen,
  Users,
  Code2,
  Zap,
  Target,
  Globe
} from 'lucide-react';

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12"
  >
    <div className="flex justify-center mb-4">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
        <Icon className="w-8 h-8 text-white" />
      </div>
    </div>
    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-xl text-white/70 max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ duration: 0.3 }}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
  >
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </motion.div>
);

export default function Docs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                CodeVis
              </span>
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              A revolutionary platform designed to transform how students and educators 
              approach Data Structures and Algorithms
            </p>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            icon={Sparkles}
            title="Our Vision"
            subtitle="Making Data Structures & Algorithms accessible, interactive, and enjoyable for everyone"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Bridging the Gap Between Theory and Understanding
                </h3>
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  Learning Data Structures and Algorithms has always been challenging. 
                  Students often struggle to visualize abstract concepts, leading to 
                  frustration and disengagement.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  <span className="text-purple-400 font-semibold">CodeVis</span> transforms 
                  this experience by providing real-time, interactive visualizations that make 
                  complex algorithms intuitive and engaging. We believe that when students can 
                  <span className="text-pink-400 font-semibold"> see</span> how data structures 
                  work, they truly understand them.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl font-black text-purple-400 mb-2">7+</div>
                  <div className="text-white/70">Data Structures</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl font-black text-pink-400 mb-2">4</div>
                  <div className="text-white/70">Languages Supported</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl font-black text-blue-400 mb-2">∞</div>
                  <div className="text-white/70">Learning Possibilities</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl font-black text-green-400 mb-2">100%</div>
                  <div className="text-white/70">Interactive</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Educators Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            icon={GraduationCap}
            title="For Engineering Colleges & Educators"
            subtitle="Empowering professors to deliver engaging, interactive lectures"
          />
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Live Demonstrations</h3>
                  <p className="text-white/70 leading-relaxed">
                    Project CodeVis directly in your classroom. Show students exactly how 
                    algorithms execute, step by step. No more static diagrams on whiteboards—
                    bring your lectures to life with real-time animations.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Improved Student Engagement</h3>
                  <p className="text-white/70 leading-relaxed">
                    Students stay focused and engaged when they can interact with concepts. 
                    Watch comprehension rates soar as abstract algorithms become tangible, 
                    visual experiences.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Multi-Language Support</h3>
                  <p className="text-white/70 leading-relaxed">
                    Teach in any language your students prefer. CodeVis provides code examples 
                    in Python, JavaScript, Java, and C++, ensuring every student can follow 
                    along in their comfort zone.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Zero Setup Required</h3>
                  <p className="text-white/70 leading-relaxed">
                    No installation, no configuration. Access CodeVis directly from any browser. 
                    Perfect for computer labs, remote learning, or hybrid classrooms.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Transform Your DSA Lectures Today
            </h3>
            <p className="text-white/80 text-lg mb-6">
              Join educators worldwide who are using CodeVis to make Data Structures 
              and Algorithms more accessible and engaging for their students.
            </p>
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold">
              Free for All Educators
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Deep Dive Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            icon={Lightbulb}
            title="Features & Design Philosophy"
            subtitle="Every feature is crafted with purpose and student success in mind"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Target}
              title="Interactive Visualizations"
              description="Real-time animations show exactly how data structures change with each operation. Watch insertions, deletions, and traversals happen before your eyes."
              gradient="from-blue-500 to-cyan-500"
            />
            
            <FeatureCard
              icon={Code2}
              title="Multi-Language Code Examples"
              description="Learn in Python, JavaScript, Java, or C++. See the exact implementation alongside the visualization to connect theory with practice."
              gradient="from-green-500 to-emerald-500"
            />
            
            <FeatureCard
              icon={Zap}
              title="Step-by-Step Animations"
              description="Animated traversals highlight nodes sequentially with color gradients, making complex algorithms like BFS, DFS, and tree traversals crystal clear."
              gradient="from-purple-500 to-pink-500"
            />
            
            <FeatureCard
              icon={BookOpen}
              title="Operation History"
              description="Track every operation you perform. Review your steps, understand the sequence, and learn from your experimentation."
              gradient="from-orange-500 to-red-500"
            />
            
            <FeatureCard
              icon={Users}
              title="Drag-and-Drop Interaction"
              description="In graph visualizations, drag nodes to arrange them however you like. Explore different layouts and understand graph structures better."
              gradient="from-yellow-500 to-amber-500"
            />
            
            <FeatureCard
              icon={Globe}
              title="Responsive & Accessible"
              description="Works perfectly on any device—laptop, tablet, or phone. Learn anywhere, anytime, without barriers."
              gradient="from-indigo-500 to-blue-500"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Why These Features Matter</h3>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Each feature in CodeVis is designed based on educational research and student feedback. 
              We believe that learning happens best when students can:
            </p>
            <ul className="space-y-3 text-white/70 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong className="text-white">See</strong> concepts visually, not just read about them</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 font-bold">•</span>
                <span><strong className="text-white">Interact</strong> with data structures in real-time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span><strong className="text-white">Experiment</strong> without fear of breaking anything</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">•</span>
                <span><strong className="text-white">Review</strong> their learning journey through operation history</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-pink-900/10 to-transparent">
        <div className="max-w-5xl mx-auto">
          <SectionHeader 
            icon={Heart}
            title="Built with Passion & Purpose"
            subtitle="A journey of learning, building, and contributing"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                Hi, I'm <span className="text-white font-semibold">Piyush Pandey</span>, 
                and CodeVis is my first major product—a project born from personal experience 
                and a deep passion for making technology accessible to everyone.
              </p>
              
              <p>
                Like many engineering students, I struggled with Data Structures and Algorithms. 
                The concepts felt abstract, the textbooks dense, and the lack of interactive tools 
                made learning frustrating. I realized that <span className="text-purple-400 font-semibold">
                visualization</span> was the missing piece—the bridge between theory and true understanding.
              </p>
              
              <p>
                That's when I decided to build CodeVis. Not just as a tool for myself, but as a 
                contribution to the countless students worldwide who face the same challenges. 
                This project represents my commitment to becoming a 
                <span className="text-pink-400 font-semibold"> useful software developer</span>—
                someone who builds products that genuinely solve problems and create value for society.
              </p>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 my-8">
                <h4 className="text-2xl font-bold text-white mb-4">My Vision</h4>
                <p className="text-white/70 leading-relaxed">
                  I want CodeVis to reach students in classrooms, universities, and homes across the world. 
                  I envision a future where no student has to struggle with DSA because they lack the right 
                  tools. My goal is to contribute meaningfully to education technology and prove that 
                  software can be a force for good, accessibility, and empowerment.
                </p>
              </div>

              <p>
                This is just the beginning. I'm continuously learning, iterating, and improving CodeVis 
                based on user feedback. My passion lies in understanding problems deeply and crafting 
                solutions that are <span className="text-blue-400 font-semibold">intuitive</span>, 
                <span className="text-green-400 font-semibold"> elegant</span>, and 
                <span className="text-yellow-400 font-semibold"> impactful</span>.
              </p>

              <p>
                If CodeVis has helped you, or if you have ideas for improvement, I'd love to hear from you. 
                This project is a testament to my belief that technology should serve people, and every 
                line of code I write is driven by the desire to make a positive difference.
              </p>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-xl font-semibold text-white mb-2">
                  Thank you for being part of this journey.
                </p>
                <p className="text-white/60">
                  — Piyush Pandey, Creator of CodeVis
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-black text-purple-400 mb-2">First Product</div>
              <div className="text-white/70">Learning by Building</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-black text-pink-400 mb-2">Open Mindset</div>
              <div className="text-white/70">Contribution Over Profit</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-black text-blue-400 mb-2">Student First</div>
              <div className="text-white/70">Built for Learners</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Explore 7+ interactive data structure visualizations and transform 
              your understanding of algorithms today.
            </p>
            <motion.a
              href="/visualizers"
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 30px rgba(99, 102, 241, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-indigo-500/50 transition-all duration-300"
            >
              Explore Visualizers
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
