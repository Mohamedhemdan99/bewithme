
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                Be heard.
                <br />
                Be seen.
                <br />
                <span className="text-white">be with me</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-lg opacity-90">
                Connect with people around the world, share your thoughts, and build meaningful relationships in a safe and friendly environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-md text-lg shadow-lg">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-md text-lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/lovable-uploads/e1752e3a-5228-4aee-84a2-44186418dd24.png" 
                alt="People connecting illustration" 
                className="max-w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why This App Matters Section */}
      <section className="app-section bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title">Why This App Matters?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="feature-card">
                <div className="feature-icon bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v.01M8.781 7.782l.01-.01M7 12h.01M8.781 16.218l.01.01M12 19.99V20M15.219 16.218l.01.01M17 12h.01M15.219 7.782l.01-.01" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-orange-500 text-white font-bold rounded-full">1</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Helping the Blind</h3>
                <p className="text-gray-600">
                  The smart assistant helps the blind while walking by using the phone camera and warns them of obstacles such as walls or poles.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="feature-card">
                <div className="feature-icon bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-orange-500 text-white font-bold rounded-full">2</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Assist Hearing-Impaired in Calls</h3>
                <p className="text-gray-600">
                  Converts phone calls into readable text instantly to help hearing-impaired users understand the conversation.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="feature-card">
                <div className="feature-icon bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-orange-500 text-white font-bold rounded-full">3</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Improve Pronunciation</h3>
                <p className="text-gray-600">
                  Supports hearing-impaired users in pronouncing words correctly by simulating lip movement and speaking the word aloud.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="feature-card">
                <div className="feature-icon bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-orange-500 text-white font-bold rounded-full">4</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Privacy & Security</h3>
                <p className="text-gray-600">
                  We respect user privacy and use the latest security technologies to protect data and personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Service Section */}
      <section className="app-section bg-blue-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title">About the Service</h2>
          
          <div className="text-center mb-12">
            <p className="text-gray-700 max-w-3xl mx-auto text-lg">
              A smart assistive platform that helps the blind with voice-guided camera use and supports the hearing impaired by converting calls to text and improving pronunciation through visual-audio feedback.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center">
              <div className="bg-blue-100 rounded-lg w-full aspect-square mb-6 flex items-center justify-center p-4">
                <img src="/lovable-uploads/b36a283a-1ea8-4d31-b9f6-749978bf0517.png" alt="App Screenshot" className="max-w-full h-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Helping the Blind</h3>
              <p className="text-gray-600 text-center">
                Use the phone camera with voice guidance to identify objects and navigate surroundings
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center">
              <div className="bg-blue-100 rounded-lg w-full aspect-square mb-6 flex items-center justify-center p-4">
                <img src="/lovable-uploads/c29ccb87-008f-49cb-a2bd-c7b1d4b1e95f.png" alt="App Screenshot" className="max-w-full h-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Call-to-Text Conversion</h3>
              <p className="text-gray-600 text-center">
                Convert phone calls into live text to help the hearing impaired follow conversations easily
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center">
              <div className="bg-blue-100 rounded-lg w-full aspect-square mb-6 flex items-center justify-center p-4">
                <img src="/lovable-uploads/b36a283a-1ea8-4d31-b9f6-749978bf0517.png" alt="App Screenshot" className="max-w-full h-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Word Translation</h3>
              <p className="text-gray-600 text-center">
                Translate spoken words and teach correct lip-synced pronunciation using visual-audio aids
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center">
              <div className="bg-blue-100 rounded-lg w-full aspect-square mb-6 flex items-center justify-center p-4">
                <img src="/lovable-uploads/abaaa508-74e9-4f09-b6e9-cd6198c6ef4f.png" alt="App Screenshot" className="max-w-full h-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">App Security Features</h3>
              <p className="text-gray-600 text-center">
                Ensure data protection and secure access with advanced app-level security protocols
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ready to connect?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of users already connecting and sharing on our platform
          </p>
          <Link to="/signup">
            <Button className="btn-primary text-lg py-3 px-10">
              Create your account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer with Subscribe */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <img src="/lovable-uploads/c29ccb87-008f-49cb-a2bd-c7b1d4b1e95f.png" alt="Logo" className="w-10 h-10 mr-2" />
                Be With Me
              </h3>
              <p className="text-gray-600 mb-6">
                is a smart assistive app that supports the blind and hearing impaired through AI-powered features like voice-guided camera assistance
              </p>
              
              <h4 className="font-semibold mb-3">Social Media</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.045 23.0327H13.4951V12.9658H16.9636L17.334 8.93986H13.4951V6.49372C13.4951 5.35278 13.7879 4.6904 15.3522 4.6904H17.4233V1.08551C17.0826 1.0404 15.8179 0.941895 14.2949 0.941895C11.1134 0.941895 8.94462 2.89243 8.94462 6.16186V8.93986H5.57666V12.9658H8.94462V23.0327H9.045Z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Subscribe our Newsletter</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter to stay updated on "Be With Me" — a smart project designed to empower people with disabilities, especially the blind and hearing impaired, through innovative assistive solutions.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="rounded-r-none"
                />
                <Button className="btn-primary rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">bewithme.team@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">01120276417</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} BeWithMe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
