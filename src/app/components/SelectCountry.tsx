"use server";
export async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (response.ok) {
      const countries = await response.json();
      return countries;
    } else {
      throw new Error("Failed to fetch countries");
    }
  } catch (error) {
    console.error("Failed to fetch countries:", error);
  }
}
