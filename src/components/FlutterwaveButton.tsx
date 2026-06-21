import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

interface FlutterwaveButtonProps {
  amount: number;
  email: string;
  name: string;
  tx_ref?: string;
  planKey?: string;
  onSuccess?: (response: FlutterwaveResponse) => void;
}

interface FlutterwaveResponse {
  tx_ref?: string;
  transaction_id?: number;
  status?: string;
}

const FlutterwaveButton = ({
  amount,
  email,
  name,
  tx_ref,
  planKey,
  onSuccess,
}: FlutterwaveButtonProps) => {
  const paymentReference = tx_ref || `glamour-${Date.now()}`;
  const configuredSuccessUrl = import.meta.env.VITE_FLW_SUCCESS_URL || "/success";
  const successUrl = new URL(configuredSuccessUrl, window.location.origin).toString();
  const redirectUrl = `${successUrl}?tx_ref=${paymentReference}${planKey ? `&plan=${planKey}` : ""}`;

  const config = {
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: paymentReference,
    amount,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd,mobilemoney",
    customer: {
      email,
      name,
      phonenumber: "",
    },
    customizations: {
      title: "Glamour Launchpad",
      description: "Package Purchase",
      logo: "https://your-logo-url.com/logo.png",
    },
    redirect_url: redirectUrl,
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      type="button"
      onClick={() => {
        handleFlutterPayment({
          callback: (response: FlutterwaveResponse) => {
            console.log("Payment response:", response);
            if (onSuccess) {
              onSuccess(response);
            }
            closePaymentModal();
            window.location.href = `${successUrl}?tx_ref=${response.tx_ref || paymentReference}${planKey ? `&plan=${planKey}` : ""}`;
          },
          onClose: () => console.log("Payment modal closed"),
        });
      }}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold"
    >
      Pay ₦{amount.toLocaleString()} Now
    </button>
  );
};

export default FlutterwaveButton;
