import { ImageResponse } from 'next/og';
import { FaTerminal } from 'react-icons/fa';

export const runtime = 'edge';

export const size = { width: 32, height: 32 };

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<FaTerminal size={32} />, { ...size });
}
