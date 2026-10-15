import type { ContactContent } from "@/content/types";

export const contact: ContactContent = {
  meta: {
    title: "Contact and a free demo of your store",
    description:
      "We build a free demo of your store on the VidGo platform, with your skin, your products and your identity. Or write directly: the person who built the platform answers, not a department.",
  },
  breadcrumb: "Contact",
  header: {
    eyebrow: "Contact",
    title: "You talk directly to the person who built the platform.",
    description: "No ticket form and no support account. Choose the channel that suits you.",
  },
  channels: [
    {
      title: "A free demo of your store",
      body: "We build a free demo of your store on our platform, with your skin, your products and your identity. Just ask, we do it.",
      cta: "Request a free demo",
      target: "start",
    },
    {
      title: "Email",
      body: "For questions, written offers or to send the address of your current store before the call.",
      target: "email",
    },
    {
      title: "Phone",
      body: "Monday to Friday, during business hours. If I do not answer, I call back.",
      target: "phone",
    },
    {
      title: "Tell me what hurts in your current store",
      body: "A short form: which platform you have, what does not work, how to reach you. You get a concrete answer, not a newsletter.",
      cta: "Open the form",
      target: "start",
    },
  ],
  linkedin: "Ioana Dinu on LinkedIn",
};
