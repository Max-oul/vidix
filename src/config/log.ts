import { Service } from "typedi";
import winston from "winston";
import "dotenv/config";

@Service()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: "./logs/error.log",
          level: "error",
        }),
        new winston.transports.File({ filename: "./logs/combined.log" }),
      ],
    });
    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
  }

  public debug(message: string) {
    this.logger.debug(message);
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }
}
