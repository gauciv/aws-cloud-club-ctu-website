"use server"

export async function subscribe(
  _prevState: { ok: boolean; message: string },
  formData: FormData,
): Promise<{ ok: boolean; message: string }> {
  const email = String(formData.get("email") || "").trim()

  if (!email || !email.includes("@")) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  // Simulate storing/subscribing. Replace with your provider or DB.
  console.log("New subscriber (demo):", { email })

  return { ok: true, message: `Thanks! We’ll notify ${email} when we launch.` }
}
