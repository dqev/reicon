import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { openSponsorCheckout } from '@/lib/sponsor';

export default function SupportPage() {
  const navigate = useNavigate();

  useEffect(() => {
    openSponsorCheckout();
    navigate('/', { replace: true });
  }, [navigate]);

  return <div className="flex-1 flex items-center justify-center min-h-[50vh] text-text-base/60">Opening Dodo Payments Checkout...</div>;
}
