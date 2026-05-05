import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simple Admin login state
const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    // Check if token exists in local storage on initial load
    return localStorage.getItem('adminToken') !== null;
  });
  const [password, setPassword] = React.useState("");
  
  const login = (): boolean => {
    const expected = import.meta.env.VITE_ADMIN_TOKEN;
    if (expected && password === expected) {
      setIsAuthenticated(true);
      setAuthToken(expected);
      return true;
    }
    return false;
  };
  
  return { isAuthenticated, password, setPassword, login };
};

// Define types for the data responses
type NewsletterSubscriber = {
  id: number;
  email: string;
  createdAt: string;
};

type ContactSubmission = {
  id: number;
  name: string;
  company: string;
  email: string;
  message: string;
  createdAt: string;
};

type ChecklistLead = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type EmailLead = {
  id: number;
  email: string;
  createdAt: string;
};

// Set token when authenticated
const setAuthToken = (token: string) => {
  localStorage.setItem('adminToken', token);
};

// Get token from storage
const getAuthToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

// Custom API fetcher for admin routes with authentication
const adminFetcher = async (url: string) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('API request failed');
  }
  
  return response.json();
};

// Newsletter subscribers component
const NewsletterSubscribers = () => {
  const { data, isLoading, error } = useQuery<{ success: boolean; subscribers: NewsletterSubscriber[] }>({
    queryKey: ['/api/admin/newsletters'],
    queryFn: () => adminFetcher('/api/admin/newsletters'),
  });
  
  if (isLoading) return <div>Loading newsletter subscribers...</div>;
  if (error) return <div>Error loading newsletter subscribers.</div>;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
        <CardDescription>People who signed up for your newsletter</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.subscribers && data.subscribers.length > 0 ? (
              data.subscribers.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.id}</TableCell>
                  <TableCell>{sub.email}</TableCell>
                  <TableCell>{new Date(sub.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No newsletter subscribers yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Lead magnet subscribers component
const LeadMagnetSubscribers = () => {
  const { data, isLoading, error } = useQuery<{ success: boolean; subscribers: NewsletterSubscriber[] }>({
    queryKey: ['/api/admin/lead-magnets'],
    queryFn: () => adminFetcher('/api/admin/lead-magnets'),
  });
  
  if (isLoading) return <div>Loading lead magnet subscribers...</div>;
  if (error) return <div>Error loading lead magnet subscribers.</div>;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Magnet Subscribers</CardTitle>
        <CardDescription>People who requested your free PDF</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.subscribers && data.subscribers.length > 0 ? (
              data.subscribers.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.id}</TableCell>
                  <TableCell>{sub.email}</TableCell>
                  <TableCell>{new Date(sub.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No lead magnet subscribers yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Email leads component
const EmailLeadsSection = () => {
  const { data, isLoading, error } = useQuery<{ success: boolean; leads: EmailLead[] }>({
    queryKey: ['/api/admin/email-leads'],
    queryFn: () => adminFetcher('/api/admin/email-leads'),
  });
  
  if (isLoading) return <div>Loading email leads...</div>;
  if (error) return <div>Error loading email leads.</div>;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Leads</CardTitle>
        <CardDescription>Simple email captures from lead forms</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.leads && data.leads.length > 0 ? (
              data.leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.id}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{new Date(lead.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No email leads yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Contact submissions component
const ContactSubmissions = () => {
  const { data, isLoading, error } = useQuery<{ success: boolean; submissions: ContactSubmission[] }>({
    queryKey: ['/api/admin/contacts'],
    queryFn: () => adminFetcher('/api/admin/contacts'),
  });
  
  if (isLoading) return <div>Loading contact submissions...</div>;
  if (error) return <div>Error loading contact submissions.</div>;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form Submissions</CardTitle>
        <CardDescription>People who contacted you through the form</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.submissions && data.submissions.length > 0 ? (
              data.submissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.id}</TableCell>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>{sub.company}</TableCell>
                  <TableCell>{sub.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{sub.message}</TableCell>
                  <TableCell>{new Date(sub.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No contact submissions yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Login form component
const LoginForm = ({ password, setPassword, onLogin }: { 
  password: string; 
  setPassword: (password: string) => void; 
  onLogin: () => boolean; 
}) => {
  const [error, setError] = React.useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = onLogin();
    if (result) {
      setError("");
    } else {
      setError("Incorrect password");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter your password to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Admin component
const Admin = () => {
  const { isAuthenticated, password, setPassword, login } = useAdminAuth();
  
  if (!isAuthenticated) {
    return <LoginForm password={password} setPassword={setPassword} onLogin={login} />;
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Fripse Admin Dashboard</h1>
      
      <Tabs defaultValue="newsletter" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="leadmagnet">Lead Magnet</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>
        <TabsContent value="newsletter" className="mt-4">
          <NewsletterSubscribers />
        </TabsContent>
        <TabsContent value="leadmagnet" className="mt-4">
          <LeadMagnetSubscribers />
        </TabsContent>
        <TabsContent value="email-leads" className="mt-4">
          <EmailLeadsSection />
        </TabsContent>
        <TabsContent value="contacts" className="mt-4">
          <ContactSubmissions />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <Button onClick={() => window.location.href = "/"} variant="outline">
          Back to Website
        </Button>
      </div>
    </div>
  );
};

export default Admin;