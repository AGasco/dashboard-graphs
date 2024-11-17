import { signIn } from 'next-auth/react';
import React from 'react';

const SocialsSignIn = () => {
  return (
    <div className="flex mb-2 space-x-2">
      <button
        onClick={() => signIn('github', { callbackUrl: '/' })}
        className=" flex items-center justify-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
      >
        <img src="/github-logo.png" alt="GitHub" className="w-5 h-5 mr-2" />
      </button>
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className=" flex items-center justify-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
      >
        <img src="/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
      </button>
    </div>
  );
};

export default SocialsSignIn;
