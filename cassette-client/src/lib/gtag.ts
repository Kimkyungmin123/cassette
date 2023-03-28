const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
const gtag = { GA_TRACKING_ID, pageview, event };

export default gtag;
