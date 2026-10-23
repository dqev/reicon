import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSponsorCheckout } from '@/components/layout/SponsorCheckout';

export default function SupportPage() {
  const navigate = useNavigate();
  const { startSponsorCheckout } = useSponsorCheckout();

  useEffect(() => {
    startSponsorCheckout();
    navigate('/', { replace: true });
  }, [navigate, startSponsorCheckout]);

  return <main className="flex-1 flex items-center justify-center min-h-[50vh] text-text-base/60">Opening Dodo Payments...</main>;
}
