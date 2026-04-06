export const registerCheckboxes = [
  {
    key: "accept_privacy_policy",
    label: (
      <>
        J&apos;accepte la{" "}
        <span className="cursor-pointer font-semibold underline underline-offset-2">
          politique de confidentialité
        </span>
      </>
    ),
  },
  {
    key: "newsletter",
    label: <>S&apos;inscrire à la Newsletter</>,
  },
  {
    key: "remember",
    label: <>Garder ma session ouverte</>,
  },
] as const;