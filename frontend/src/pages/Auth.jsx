import { useState } from "react";
import Login from '../pages/Login';
import Register from '../pages/Register';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 text-white p-12 flex-col justify-center">
        <div>
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            Task Manager
          </h1>

          <div className="w-20 h-0.5 bg-white/30 mb-8"></div>

          <p className="text-xl text-slate-300 leading-relaxed font-light max-w-md">
            Organize your work, track progress,
            and stay productive every day.
          </p>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
              <span className="text-slate-300 font-light">Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
              <span className="text-slate-300 font-light">Real-time collaboration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
              <span className="text-slate-300 font-light">Advanced analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-slate-900 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <div className="w-12 h-px bg-slate-200 mx-auto mt-3 mb-3"></div>
            <p className="text-slate-500 text-sm font-light">
              {isLogin ? "Sign in to your account" : "Get started with your account"}
            </p>
          </div>

          {isLogin ? (
            <Login />
          )  : (
            <Register onRegisterSuccess={() => setIsLogin(true)}
            />
          )}

          <div className="mt-8 pt-6 text-center border-t border-slate-100">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-600 hover:text-slate-900 font-light transition-colors duration-200"
            >
              {isLogin
                ? "Don't have an account? Create one"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;