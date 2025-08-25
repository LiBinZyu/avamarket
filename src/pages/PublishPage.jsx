import React, { useState } from 'react';
import Footer from '../components/Footer';


const PublishPage = () => {
  const [publishType, setPublishType] = useState('template');
  const [formData, setFormData] = useState({
    title: '',
    labels: '',
    readme: '',
    dslFiles: [{ platformName: '', fileUrl: '' }],
    projectUrl: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDslFileChange = (index, field, value) => {
    const newDslFiles = [...formData.dslFiles];
    newDslFiles[index][field] = value;
    setFormData(prev => ({ ...prev, dslFiles: newDslFiles }));
  };

  const addDslFile = () => {
    setFormData(prev => ({ ...prev, dslFiles: [...prev.dslFiles, { platformName: '', fileUrl: '' }] }));
  };

  const removeDslFile = (index) => {
    if (formData.dslFiles.length > 1) {
      const newDslFiles = formData.dslFiles.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, dslFiles: newDslFiles }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const renderTemplateForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-primary-font mb-2">Type</label>
        <div className="dropdown-container">
          <select className="dropdown-select">
            <option value="AI">AI</option>
            <option value="Sales">Sales</option>
            <option value="IT Ops">IT Ops</option>
            <option value="Marketing">Marketing</option>
            <option value="Document Ops">Document Ops</option>
            <option value="Other">Other</option>
            <option value="Support">Support</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-font mb-2">Title</label>
        <input type="text" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="input-field" placeholder="Enter template title" />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-font mb-2">Labels (comma separated)</label>
        <input type="text" value={formData.labels} onChange={(e) => handleInputChange('labels', e.target.value)} className="input-field" placeholder="e.g. OpenAI, Discord, Google Sheets" />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-font mb-2">SVG Preview</label>
        <div className="border-2 border-dashed border-gray-200 rounded-input p-6 text-center">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-secondary-font">Click to upload or drag files here</p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-font mb-2">DSL Files</label>
        <div className="space-y-3">
          {formData.dslFiles.map((dsl, index) => (
            <div key={index} className="flex space-x-3">
              <input type="text" value={dsl.platformName} onChange={(e) => handleDslFileChange(index, 'platformName', e.target.value)} className="input-field flex-1" placeholder="Platform name (e.g. Dify, n8n)" />
              <input type="file" className="input-field flex-1" accept=".json,.yaml,.yml" />
              {formData.dslFiles.length > 1 && (
                <button type="button" onClick={() => removeDslFile(index)} className="btn-secondary text-red-500 bg-red-50">Delete</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addDslFile} className="btn-secondary bg-LightBlue">+ Add Platform</button>
        </div>
      </div>
    </div>
  );

  const renderPlatformForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-primary-font mb-2">Title</label>
        <input type="text" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="input-field" placeholder="Enter platform title" />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-font mb-2">Labels (comma separated)</label>
        <input type="text" value={formData.labels} onChange={(e) => handleInputChange('labels', e.target.value)} className="input-field" placeholder="e.g. OpenAI, Google Drive, Slack" />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-font mb-2">Project URL</label>
        <input type="url" value={formData.projectUrl} onChange={(e) => handleInputChange('projectUrl', e.target.value)} className="input-field" placeholder="https://example.com" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-secondary-font text-center mb-8">Publish Content</h1>
          <div className="window window-inner-glow p-6 mb-8">
            <h2 className="text-lg font-semibold text-primary-font mb-4">Select Type</h2>
            <div className="toggler-group">
              {['template', 'platform', 'mcp'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPublishType(type)}
                  className={`toggler-btn ${publishType === type ? 'selected' : ''}`}
                >
                  {type === 'template' ? 'Template' : type === 'platform' ? 'Platform' : 'MCP'}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="window window-inner-glow p-8">
            {publishType === 'template' ? renderTemplateForm() : renderPlatformForm()}
            <div className="mt-8">
              <label className="block text-sm font-medium text-primary-font mb-2">README</label>
              <div className="border border-gray-200 rounded-input">
                <div className="flex border-b border-gray-200">
                  <button type="button" className="px-4 py-2 text-sm font-medium text-DifyBlue border-b-2 border-DifyBlue">Edit</button>
                  <button type="button" className="px-4 py-2 text-sm font-medium text-secondary-font hover:text-primary-font roboto-mono-medium">Preview</button>
                </div>
                <textarea value={formData.readme} onChange={(e) => handleInputChange('readme', e.target.value)} className="w-full p-4 outline-none resize-none h-64" placeholder="Enter README content, supports Markdown..." />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button type="button" className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary">Publish</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublishPage;
