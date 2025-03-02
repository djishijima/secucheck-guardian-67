
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ScopeNavbar: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Link to="/scope-one">
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          Scope 1
        </Button>
      </Link>
      <Link to="/scope-two">
        <Button variant="outline">
          Scope 2
        </Button>
      </Link>
      <Link to="/scope-three">
        <Button variant="outline">
          Scope 3
        </Button>
      </Link>
    </div>
  );
};

export default ScopeNavbar;
