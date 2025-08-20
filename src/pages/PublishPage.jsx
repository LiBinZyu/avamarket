import React, { useState } from 'react';

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
        <select className="input-field">
          <option>AI</option>
          <option>Sales</option>
          <option>IT Ops</option>
          <option>Marketing</option>
          <option>Document Ops</option>
          <option>Other</option>
          <option>Support</option>
        </select>
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
                <button type="button" onClick={() => removeDslFile(index)} className="px-4 py-3 bg-red-100 text-red-600 rounded-input hover:bg-red-200 transition-colors duration-200">Delete</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addDslFile} className="px-4 py-2 border border-gray-300 text-secondary-font rounded-button hover:bg-gray-50 transition-colors duration-200">+ Add Platform</button>
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
    <div className="min-h-screen bg-light-bg">
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-font text-center mb-8">Publish Content</h1>
          <div className="bg-white rounded-card shadow-card p-6 mb-8">
            <h2 className="text-lg font-semibold text-primary-font mb-4">Select Publish Type</h2>
            <div className="flex space-x-4">
              {['template', 'platform', 'mcp'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPublishType(type)}
                  className={`px-6 py-3 rounded-button border transition-colors duration-200 ${publishType === type ? 'border-DifyBlue bg-DifyBlue text-white' : 'border-gray-200 text-secondary-font hover:border-gray-300'}`}
                >
                  {type === 'template' ? 'Template' : type === 'platform' ? 'Platform' : 'MCP'}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-card shadow-card p-8">
            {publishType === 'template' ? renderTemplateForm() : renderPlatformForm()}
            <div className="mt-8">
              <label className="block text-sm font-medium text-primary-font mb-2">README</label>
              <div className="border border-gray-200 rounded-input">
                <div className="flex border-b border-gray-200">
                  <button type="button" className="px-4 py-2 text-sm font-medium text-DifyBlue border-b-2 border-DifyBlue">Edit</button>
                  <button type="button" className="px-4 py-2 text-sm font-medium text-secondary-font hover:text-primary-font">Preview</button>
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
    </div>
  );
};

export default PublishPage;
