import { FaTerminal } from 'react-icons/fa';

export const Logo: React.FC<{ size?: number }> = ({ size }) => {
  return <FaTerminal size={size ?? 20} />;
};
