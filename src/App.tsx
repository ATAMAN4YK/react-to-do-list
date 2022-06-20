import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TasksPage from './components/pages/Tasks';
import CategoriesPage from './components/pages/Categories';
import Layout from './components/pages/pages components/Layout';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/Tasks" element={<TasksPage />} />
          <Route path="/Categories" element={<CategoriesPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
