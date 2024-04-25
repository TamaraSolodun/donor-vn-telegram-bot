import React from "react";

export default function ButtonWrapperTest({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} data-testid="send-button">
      {children}
    </button>
  );
}
