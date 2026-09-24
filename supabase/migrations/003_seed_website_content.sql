-- REFERESTATES Supabase Migration - Phase 10 (Website Content)

INSERT INTO website_content (section, key, value, content_type) VALUES 
('homepage', 'hero_heading', 'A NEW ERA OF LUXURY REAL ESTATE', 'text'),
('homepage', 'hero_subtitle', 'Discover exclusive properties, premium developments, and unparalleled coastal living in Saudi Arabia.', 'text'),
('homepage', 'hero_cta', 'Explore Properties', 'text'),
('homepage', 'about_heading', 'Redefining Luxury Living in Saudi Arabia', 'text'),
('homepage', 'about_text', 'At REFERESTATES, we specialize in curating the finest properties across the Kingdom. From the futuristic landscapes of NEOM to the pristine coastlines of Jeddah and the vibrant heart of Riyadh, we connect discerning clients with extraordinary homes. Our approach is built on exclusivity, precision, and an intimate understanding of the Saudi luxury market.', 'text'),
('homepage', 'international_heading', 'Looking to Buy Property in Saudi Arabia From Abroad?', 'text'),
('homepage', 'international_text', 'REFERESTATES helps international buyers discover suitable properties and projects in Saudi Arabia through a simple, guided experience.', 'text'),
('homepage', 'final_cta_heading', 'Your Next Property Could Start With One Conversation.', 'text'),
('homepage', 'final_cta_text', 'Tell REFERESTATES what you''re looking for, and we''ll help you explore the right opportunities.', 'text')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
