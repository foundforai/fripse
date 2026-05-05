import React from "react";
import { Button } from "@/components/ui/button";

const AdminLink: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="outline" 
        size="sm"
        className="bg-white/80 backdrop-blur-sm text-gray-600 border-gray-300 hover:bg-white hover:text-primary"
        onClick={() => window.location.href = "/admin"}
      >
        Admin Dashboard
      </Button>
    </div>
  );
};

export default AdminLink;