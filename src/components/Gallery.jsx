import React, { useState, useEffect } from 'react';
import { galleryImages as mockGalleryImages } from '../data/mockData';
import './Gallery.css';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [galleryImages, setGalleryImages] = useState(mockGalleryImages);

    useEffect(() => {
        fetch('http://localhost:5000/api/gallery')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setGalleryImages(data);
                }
            })
            .catch(err => console.error("Error fetching gallery:", err));
    }, []);

    const filteredImages = filterCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === filterCategory);

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredImages.length;
        } else {
            newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        }

        setSelectedImage(filteredImages[newIndex]);
    };

    // Function to download image directly
    const downloadImage = async (imageUrl, imageName) => {
        try {
            console.log('Downloading image:', imageUrl);
            // Fetch the image as a blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            
            // Create a blob URL
            const blobUrl = URL.createObjectURL(blob);
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = imageName || 'kalaafy-image.jpg';
            
            // Append to the body
            document.body.appendChild(link);
            
            // Trigger the download
            link.click();
            
            // Remove the link from the document
            document.body.removeChild(link);
            
            // Release the blob URL
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback: open in new tab if download fails
            window.open(imageUrl, '_blank');
        }
    };

    return (
        <section id="gallery" className="section gallery-section">
            <div className="container">
                <h2 className="section-title">Gallery</h2>

                <div className="tabs">
                    <button
                        className={`tab ${filterCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('all')}
                    >
                        All Photos
                    </button>
                    <button
                        className={`tab ${filterCategory === 'offstage' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('offstage')}
                    >
                        Offstage
                    </button>
                    <button
                        className={`tab ${filterCategory === 'onstage' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('onstage')}
                    >
                        Onstage
                    </button>
                </div>

                <div className="gallery-grid grid grid-4">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="gallery-item"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => openLightbox(image)}
                        >
                            {image.url ? (
                                <img src={image.url} alt={image.title} className="gallery-image" onError={(e) => { e.target.style.display = 'none'; }} />
                            ) : (
                                <div className="gallery-image-placeholder">
                                    <div className="placeholder-icon">📸</div>
                                    <div className="placeholder-text">{image.event}</div>
                                </div>
                            )}
                            <div className="gallery-overlay">
                                <h4>{image.title}</h4>
                                <p>{image.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>✕</button>
                    <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}>‹</button>
                    <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}>›</button>

                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        {selectedImage.url ? (
                            <div className="lightbox-image-container">
                                <img src={selectedImage.url} alt={selectedImage.title} className="lightbox-image" />
                            </div>
                        ) : (
                            <div className="lightbox-image-placeholder">
                                <div className="placeholder-icon-large">📸</div>
                                <h3>{selectedImage.event}</h3>
                            </div>
                        )}
                        <div className="lightbox-info">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.description}</p>
                            <span className={`badge ${selectedImage.category === 'offstage' ? 'badge-primary' : 'badge-secondary'}`}>
                                {selectedImage.category}
                            </span>

                            <div style={{ marginTop: '20px' }}>
                                <button
                                    className="lightbox-download"
                                    onClick={() => downloadImage(selectedImage.url, selectedImage.title)}
                                >
                                    📥 Download Image
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;