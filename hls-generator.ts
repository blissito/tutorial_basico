import { spawn, SpawnOptions } from "child_process";
import { promises as fs } from "fs";
import path from "path";

interface HLSConfig {
  inputPath: string;
  outputDir: string;
  segmentDuration: number; // en segundos
  playlistName: string;
  qualities: VideoQuality[];
}

interface VideoQuality {
  name: string;
  width: number;
  height: number;
  bitrate: string;
  audioBitrate: string;
}

class HLSGenerator {
  private config: HLSConfig;

  constructor(config: HLSConfig) {
    this.config = config;
  }

  /**
   * Genera chunks de HLS con múltiples calidades
   */
  async generateHLS(): Promise<void> {
    try {
      // Crear directorio de salida si no existe
      await this.ensureOutputDir();

      // Generar streams para cada calidad
      const qualityPromises = this.config.qualities.map((quality) =>
        this.generateQualityStream(quality)
      );

      await Promise.all(qualityPromises);

      // Crear playlist maestro
      await this.createMasterPlaylist();

      console.log("✅ HLS generado exitosamente");
    } catch (error) {
      console.error("❌ Error generando HLS:", error);
      throw error;
    }
  }

  /**
   * Genera stream para una calidad específica
   */
  private async generateQualityStream(quality: VideoQuality): Promise<void> {
    const outputPath = path.join(this.config.outputDir, quality.name);

    const args = [
      "-i",
      this.config.inputPath,
      "-c:v",
      "libx264",
      "-c:a",
      "aac",
      "-b:v",
      quality.bitrate,
      "-b:a",
      quality.audioBitrate,
      "-vf",
      `scale=${quality.width}:${quality.height}`,
      "-preset",
      "fast",
      "-crf",
      "23",
      "-sc_threshold",
      "0",
      "-g",
      "48",
      "-keyint_min",
      "48",
      "-hls_time",
      this.config.segmentDuration.toString(),
      "-hls_playlist_type",
      "vod",
      "-hls_segment_filename",
      path.join(outputPath, "segment_%03d.ts"),
      "-f",
      "hls",
      path.join(outputPath, "playlist.m3u8"),
    ];

    return this.executeFFmpeg(args);
  }

  /**
   * Crea el playlist maestro que referencia todas las calidades
   */
  private async createMasterPlaylist(): Promise<void> {
    const masterPlaylistPath = path.join(
      this.config.outputDir,
      this.config.playlistName
    );
    let masterContent = "#EXTM3U\n";
    masterContent += "#EXT-X-VERSION:3\n\n";

    for (const quality of this.config.qualities) {
      const qualityPath = path.join(quality.name, "playlist.m3u8");
      const bandwidth = this.calculateBandwidth(quality.bitrate);

      masterContent += `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${quality.width}x${quality.height}\n`;
      masterContent += `${qualityPath}\n`;
    }

    await fs.writeFile(masterPlaylistPath, masterContent);
    console.log(`📝 Playlist maestro creado: ${masterPlaylistPath}`);
  }

  /**
   * Calcula el bandwidth en bits por segundo
   */
  private calculateBandwidth(bitrate: string): number {
    const value = parseFloat(bitrate);
    if (bitrate.includes("k")) return value * 1000;
    if (bitrate.includes("M")) return value * 1000000;
    return value;
  }

  /**
   * Ejecuta comando FFmpeg
   */
  private executeFFmpeg(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const options: SpawnOptions = {
        stdio: "pipe",
        shell: true,
      };

      const ffmpeg = spawn("ffmpeg", args, options);

      let stdout = "";
      let stderr = "";

      ffmpeg.stdout?.on("data", (data) => {
        stdout += data.toString();
      });

      ffmpeg.stderr?.on("data", (data) => {
        stderr += data.toString();
      });

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg failed with code ${code}: ${stderr}`));
        }
      });

      ffmpeg.on("error", (error) => {
        reject(new Error(`FFmpeg error: ${error.message}`));
      });
    });
  }

  /**
   * Asegura que el directorio de salida existe
   */
  private async ensureOutputDir(): Promise<void> {
    try {
      await fs.access(this.config.outputDir);
    } catch {
      await fs.mkdir(this.config.outputDir, { recursive: true });
    }

    // Crear directorios para cada calidad
    for (const quality of this.config.qualities) {
      const qualityDir = path.join(this.config.outputDir, quality.name);
      await fs.mkdir(qualityDir, { recursive: true });
    }
  }

  /**
   * Genera HLS con configuración optimizada para web
   */
  static async generateWebOptimizedHLS(
    inputPath: string,
    outputDir: string,
    filename: string = "video"
  ): Promise<void> {
    const config: HLSConfig = {
      inputPath,
      outputDir,
      segmentDuration: 6,
      playlistName: `${filename}.m3u8`,
      qualities: [
        {
          name: "1080p",
          width: 1920,
          height: 1080,
          bitrate: "5000k",
          audioBitrate: "128k",
        },
        {
          name: "720p",
          width: 1280,
          height: 720,
          bitrate: "2800k",
          audioBitrate: "128k",
        },
        {
          name: "480p",
          width: 854,
          height: 480,
          bitrate: "1400k",
          audioBitrate: "128k",
        },
        {
          name: "360p",
          width: 640,
          height: 360,
          bitrate: "800k",
          audioBitrate: "96k",
        },
      ],
    };

    const generator = new HLSGenerator(config);
    await generator.generateHLS();
  }

  /**
   * Genera HLS con configuración para móviles
   */
  static async generateMobileOptimizedHLS(
    inputPath: string,
    outputDir: string,
    filename: string = "video"
  ): Promise<void> {
    const config: HLSConfig = {
      inputPath,
      outputDir,
      segmentDuration: 4,
      playlistName: `${filename}.m3u8`,
      qualities: [
        {
          name: "720p",
          width: 1280,
          height: 720,
          bitrate: "2000k",
          audioBitrate: "128k",
        },
        {
          name: "480p",
          width: 854,
          height: 480,
          bitrate: "1000k",
          audioBitrate: "96k",
        },
        {
          name: "360p",
          width: 640,
          height: 360,
          bitrate: "600k",
          audioBitrate: "64k",
        },
        {
          name: "240p",
          width: 426,
          height: 240,
          bitrate: "400k",
          audioBitrate: "64k",
        },
      ],
    };

    const generator = new HLSGenerator(config);
    await generator.generateHLS();
  }
}

// Ejemplo de uso
async function main() {
  const inputVideo = "./input/video.mp4";
  const outputDir = "./output/hls";

  try {
    console.log("🚀 Generando HLS optimizado para web...");
    await HLSGenerator.generateWebOptimizedHLS(
      inputVideo,
      outputDir,
      "video-web"
    );

    console.log("📱 Generando HLS optimizado para móviles...");
    await HLSGenerator.generateMobileOptimizedHLS(
      inputVideo,
      outputDir,
      "video-mobile"
    );

    console.log("✅ Proceso completado exitosamente");
  } catch (error) {
    console.error("❌ Error en el proceso:", error);
    process.exit(1);
  }
}

// Ejecutar si es el archivo principal
if (require.main === module) {
  main();
}

export default HLSGenerator;
