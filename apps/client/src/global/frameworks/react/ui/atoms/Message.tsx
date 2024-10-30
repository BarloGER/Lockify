interface MessageProps {
  success: boolean;
  message: string | null;
}

export const Message: React.FC<MessageProps> = ({ success, message }) => {
  return (
    <div
      className={`mt-4 p-4 rounded ${
        success ? "text-successColor" : "text-errorColor"
      }`}
    >
      {message}
    </div>
  );
};
