import Cookies from "js-cookie";
import { config } from "@config/index";

export class AuthenticationManager {
  private static instance: AuthenticationManager;
  
  // Keys for cookies
  private readonly TOKEN_KEY = "token";
  private readonly REFRESH_TOKEN_KEY = "refresh_token";
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthenticationManager();
    }
    return this.instance;
  }

  private constructor() {}

  public saveTokens(token: string, refreshToken?: string) {
    // Save token with secure flag if in production
    const secure = config.runtime.dev.isProd;
    
    Cookies.set(this.TOKEN_KEY, token, { secure, sameSite: "strict" });
    if (refreshToken) {
      Cookies.set(this.REFRESH_TOKEN_KEY, refreshToken, { secure, sameSite: "strict" });
    }
  }

  public getAccessToken(): string | undefined {
    return Cookies.get(this.TOKEN_KEY);
  }

  public getRefreshToken(): string | undefined {
    return Cookies.get(this.REFRESH_TOKEN_KEY);
  }

  public clearTokens() {
    Cookies.remove(this.TOKEN_KEY);
    Cookies.remove(this.REFRESH_TOKEN_KEY);
  }

  public async authenticate(data: Levelup.V2.Auth.Api.Auth.Signin.Response["data"]) {
    if (!data || !data.token) {
      throw new Error("Invalid authentication data");
    }

    this.saveTokens(data.token, data.refresh_token);

    // In a real implementation, we might fetch user details here if not provided
    // For now, we assume data contains user info or we return what we have
    
    return {
      user: data.user,
      token: data.token,
      // Map other fields as needed
    };
  }

  public async logout() {
    this.clearTokens();
    // Perform any other cleanup
  }
  
  public async getAuthData() {
    const token = this.getAccessToken();
    if (!token) return null;

    // Here we would typically validate the token or fetch the user profile
    // For this refactoring, we might need an endpoint to "me" or similar
    // Or we decode the token if it's a JWT (but we shouldn't rely on client-side decoding for security)
    
    // TODO: Implement proper session restoration
    return {
      token,
      // user: ... 
    };
  }
}

export default AuthenticationManager;
