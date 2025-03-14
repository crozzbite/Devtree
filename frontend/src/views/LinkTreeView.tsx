import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";

export default function LinkTreeView() {
  const [devTeeLinks, setDevTreeLinks] = useState(social);

  // agarraremos props y las pasaremos hacia el hijo
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTeeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevTreeLinks(updatedLinks);
  };

  const handleEnableLink = (SocialNetwork: string) => {
    // cambiar el estado de enabled
    const updatedLinks = devTeeLinks.map((link) => {
      if (link.name === SocialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no valida");
        }
      }
      return link;
    });
    setDevTreeLinks(updatedLinks);
  };
  return (
    <div className="space-y-5">
      {devTeeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
    </div>
  );
}
