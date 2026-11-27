// Everything editable lives here. Contact info comes from the business card.
export const studio = {
  name: "3D’s Design Studio",
  owner: "Abhishek J. Patil",
  steps: ["Design", "Develop", "Deliver"],
  email: "intheworldof3ds@gmail.com",
  phone: "7066 995 627",
  tel: "+917066995627",
  youtube: "https://www.youtube.com/@3Ds_Design_Studio",
  instagram: "https://www.instagram.com/3ds_design_studio",
  instagramHandle: "@3ds_design_studio",
};

// Google Form: clicking any Get a quote button opens this form.
export const GOOGLE_FORM = {
  action: "https://forms.gle/sjHhfdNZ46yAQARv8",
};

export const services = [
  { t: "Corporate Gifts", slug: "corporate-gifts", d: "Branded desk pieces, awards and custom giveaways.", info: "Create memorable, customised gifts that represent your brand with precision and personality.", benefits: ["Premium customisation", "Ideal for branding and events", "Suitable for small and bulk orders"] },
  { t: "CAD Designing Services", slug: "cad-design", d: "Parts and products modelled from a sketch or a measurement.", info: "We convert ideas, sketches and reference measurements into accurate, production-ready 3D CAD models.", benefits: ["Accurate 2D and 3D modelling", "Designs ready for printing or manufacturing", "Revisions based on your requirements"] },
  { t: "Prototyping", slug: "prototyping", d: "Fast physical iterations before you commit to tooling.", info: "Validate fit, function and appearance quickly with realistic prototypes before investing in expensive tooling.", benefits: ["Faster product validation", "Lower development risk", "Easy design improvements"] },
  { t: "Human Miniature", slug: "human-miniature", d: "Detailed figurines of people, scaled to sit on a shelf.", info: "Transform photographs or 3D references into personalised miniature figurines for gifts and collections.", benefits: ["Highly personalised details", "Unique keepsake or trophy", "Choice of finish and scale"] },
  { t: "Educational And Personal Projects", slug: "education-personal", d: "Support for student builds, models and hobby ideas.", info: "Get practical design and printing support for student projects, competitions and personal innovations.", benefits: ["Guidance from concept to print", "Affordable project development", "Functional and presentation-ready results"] },
  { t: "3D Printing For Manufacturing", slug: "manufacturing", d: "Small-batch production runs and fixtures.", info: "Produce repeatable functional parts, jigs and fixtures for efficient short-run manufacturing.", benefits: ["Cost-effective small batches", "Custom tooling and fixtures", "Fast turnaround and repeatable quality"] },
  { t: "3D Architectural Model", slug: "architectural-model", d: "Scale models of buildings and layouts for presentation.", info: "Present architectural ideas clearly with detailed scale models for clients, exhibitions and competitions.", benefits: ["Strong visual communication", "Detailed scale accuracy", "Improved client presentations"] },
  { t: "3D Printed Spare Parts", slug: "spare-parts", d: "Replacement parts for items that are no longer sold.", info: "Restore machines and everyday products by recreating damaged or discontinued parts.", benefits: ["Avoid replacing the full product", "Custom fit from measurements", "Fast replacement for obsolete parts"] },
  { t: "Consultation", slug: "consultation", d: "Talk through material, process and cost before printing.", info: "Make informed decisions about geometry, material, finishing, tolerances and the best fabrication process.", benefits: ["Expert process recommendations", "Clear cost and timeline planning", "Reduced rework and production risk"] },
];

export const formats = ["STL", "OBJ", "STEP", "3MF"];
export const materials = ["PLA", "ABS", "PETG", "TPU", "Resin"];

export const process = [
  { t: "Design", d: "Share a file, sketch or idea. We model, check and refine it in CAD." },
  { t: "Develop", d: "We pick the material and process, then print and finish the part." },
  { t: "Deliver", d: "Inspected, packed and handed over or shipped to you." },
];

// Add real photos to /public/images and set src, e.g. "/images/gift-01.jpg"
export const gallery = [
  { title: "Corporate gift", tag: "Gifts", src: "" },
  { title: "Human miniature", tag: "Miniature", src: "" },
  { title: "Architectural model", tag: "Architecture", src: "" },
  { title: "Spare part", tag: "Spares", src: "" },
  { title: "Prototype housing", tag: "Prototype", src: "" },
  { title: "Student project", tag: "Education", src: "" },
];

// Studio logs: newest first. Replace the sample entries with real ones.
export const logs = [
  { date: "Add date", title: "Sample log: new batch started", note: "Describe the job, material, print time and result.", status: "Printing" },
  { date: "Add date", title: "Sample log: prototype delivered", note: "Add what was made and what the client said.", status: "Delivered" },
  { date: "Add date", title: "Sample log: design review", note: "Add notes from CAD or consultation work.", status: "Design" },
];
