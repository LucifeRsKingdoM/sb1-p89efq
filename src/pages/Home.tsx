import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to JobBoard</h1>
      <p className="text-xl mb-8">Find your next opportunity or post a job</p>
      <div className="space-x-4">
        <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Register Company
        </Link>
        <Link to="/login" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;