import { MEDIA_ITEMS } from "../data/MockData";
import SimpleBentoGallery from "../components/blocks/interactive-bento-gallery";

export function GallerySection() {
  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="text-center mb-16" data-aos="fade-up">
        <h3 className="text-4xl font-bold text-white uppercase tracking-wider font-sans">
          Class{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-600">
            Gallery
          </span>
        </h3>
      </div>

      <SimpleBentoGallery mediaItems={MEDIA_ITEMS} />
    </div>
  );
}
export default GallerySection;
