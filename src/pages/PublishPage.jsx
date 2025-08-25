import React, { useState } from 'react';
import Footer from '../components/Footer';
import { ImageUp, FileText } from 'lucide-react';


const PublishPage = () => {
  const [publishType, setPublishType] = useState('template');
  const [formData, setFormData] = useState({
    title: '',
    labels: '',
    readme: '',
    dslFiles: [{ platformName: '', fileUrl: '', svgPreview: '' }],
    projectUrl: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 单个平台的 SVG 文件上传处理
  const handleDslSvgPreviewUpload = (index, e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => {
          const newDslFiles = [...prev.dslFiles];
          newDslFiles[index].svgPreview = ev.target.result;
          return { ...prev, dslFiles: newDslFiles };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDslFileChange = (index, field, value) => {
    const newDslFiles = [...formData.dslFiles];
    newDslFiles[index][field] = value;
    setFormData(prev => ({ ...prev, dslFiles: newDslFiles }));
  };

  const addDslFile = () => {
    setFormData(prev => ({ ...prev, dslFiles: [...prev.dslFiles, { platformName: '', fileUrl: '', svgPreview: '' }] }));
  };

  const removeDslFile = (index) => {
    if (formData.dslFiles.length > 1) {
      const newDslFiles = formData.dslFiles.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, dslFiles: newDslFiles }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // labels 字符串转数组
    const labelsArray = formData.labels
      .split(',')
      .map(l => l.trim())
      .filter(l => l);
    const submitData = {
      ...formData,
      labels: labelsArray,
      // dslFiles: [{ platformName, fileUrl, svgPreview }]
    };
    console.log('Form submitted:', submitData);
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
        <label className="block text-sm font-medium text-primary-font mb-2">DSL Files</label>
        <div className="space-y-3">
          {formData.dslFiles.map((dsl, index) => (
            <div key={index} className="flex flex-col gap-2 border-2 border-[var(--border-color)] shadow-[var(--shadow-sm)] rounded-lg p-3">
              <div className="flex space-x-3">
                <select
                  value={dsl.platformName}
                  onChange={e => handleDslFileChange(index, 'platformName', e.target.value)}
                  className="dropdown-select flex-1"
                >
                  <option value="">Platform</option>
                  {['Dify', 'n8n', 'Coze'].filter(
                    p => p === dsl.platformName || !formData.dslFiles.some((f, i) => f.platformName === p && i !== index)
                  ).map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                <input type="file" className="btn-secondary bg-LightBlue flex-1" accept=".json,.yaml,.yml" />
                {formData.dslFiles.length > 1 && (
                  <button type="button" onClick={() => removeDslFile(index)} className="btn-secondary text-red-500 bg-red-50">Delete</button>
                )}
              </div>
              <div className="flex items-center gap-3">
              <span className="block text-xs text-secondary-font">SVG:</span>
                <input
                  type="file"
                  accept=".svg"
                  onChange={e => handleDslSvgPreviewUpload(index, e)}
                  className="btn-secondary bg-LightBlue"
                  title="Upload SVG Preview"
                />
                <span className="block text-xs text-secondary-font">Preview</span>
                {dsl.svgPreview ? (
                  <img src={dsl.svgPreview} alt="Preview" className="w-12 h-12" />
                ) : (
                  <span className="text-xs text-secondary-font">none</span>
                )}
                
              </div>
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
                <div className="flex border-b border-gray-200 items-center">
                  <button type="button" className="px-4 py-2 text-sm font-medium text-DifyBlue border-b-2 border-DifyBlue">Edit</button>
                  <button type="button" className="px-4 py-2 text-sm font-medium text-secondary-font hover:text-primary-font roboto-mono-medium">Preview</button>
                  <div className="flex-1"></div>
                  <input
                    type="file"
                    id="readme-upload"
                    accept=".md,.markdown,.txt"
                    style={{ display: 'none' }}
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => {
                          handleInputChange('readme', ev.target.result);
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn-secondary mx-2 flex items-center gap-2"
                    onClick={() => document.getElementById('readme-upload').click()}
                  >
                    <FileText size={16} strokeWidth={1.5} color="var(--icon-hint)" />
                    Upload
                  </button>
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
