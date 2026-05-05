import type { Request, Response } from "express";
import { emailLeadSchema } from "@shared/schema";
import { storage } from "./storage";
import { ZodError } from "zod";

export async function submitEmailHandler(req: Request, res: Response) {
  try {
    // Validate request body using established schema pattern
    const validation = emailLeadSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
        errors: validation.error.errors,
      });
    }

    const { email } = validation.data;

    // Use established storage interface
    const emailLead = await storage.addEmailLead(email);

    // Return success response
    res.json({
      success: true,
      message: "Email submitted successfully",
      data: emailLead,
    });

  } catch (error) {
    console.error("Error in submit-email handler:", error);
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to process email submission",
      });
    }
  }
}