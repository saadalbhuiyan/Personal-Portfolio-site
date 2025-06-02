import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Testimonials from './pages/Testimonials';
import TestimonialDetail from './pages/TestimonialDetail';
import Contact from './pages/Contact';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import ManageProjects from './pages/Admin/ManageProjects';
import ManageBlogs from './pages/Admin/ManageBlogs';
import ManageServices from './pages/Admin/ManageServices';
import ManageTestimonials from './pages/Admin/ManageTestimonials';
import ManageContacts from './pages/Admin/ManageContacts';
import UpdatePassword from './pages/Admin/UpdatePassword';

const App = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/blogs/:id" element={<BlogDetail />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:id" element={<ServiceDetail />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/testimonials/:id" element={<TestimonialDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin" element={<Login />} />
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/projects" element={<ManageProjects />} />
                        <Route path="/admin/blogs" element={<ManageBlogs />} />
                        <Route path="/admin/services" element={<ManageServices />} />
                        <Route path="/admin/testimonials" element={<ManageTestimonials />} />
                        <Route path="/admin/contacts" element={<ManageContacts />} />
                        <Route path="/admin/password" element={<UpdatePassword />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;