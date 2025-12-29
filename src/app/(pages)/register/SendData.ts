import { RegisterFormData, AuthResponse } from "@/components/interface";

export const onSubmitData = async (
  data: RegisterFormData
): Promise<AuthResponse> => {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result: AuthResponse = await response.json();
    return result; 
  } catch (error) {
    console.error("Network Error:", error);
    return {
      message: "Network Error",
      statusMsg: "fail",
    } as AuthResponse;
  }
};
