---
sidebar_position: 4
---

# Clisis Agent - System Modules

Documentation des modules système.

---

## 📦 Modules disponibles

### SystemModule

```typescript
interface SystemInfo {
  platform: string;
  arch: string;
  cpus: number;
  totalMemory: number;
  freeMemory: number;
  uptime: number;
  hostname: string;
  username: string;
}

class SystemModule {
  static getInfo(): SystemInfo {
    return {
      platform: Deno.build.os,
      arch: Deno.build.arch,
      cpus: navigator.hardwareConcurrency,
      totalMemory: Deno.systemMemoryInfo().total,
      freeMemory: Deno.systemMemoryInfo().available,
      uptime: performance.now(),
      hostname: Deno.hostname(),
      username: Deno.user().username,
    };
  }
  
  static async listProcesses(): Promise<ProcessInfo[]> {
    const output = await new Deno.Command('ps', {
      args: ['aux'],
      stdout: 'piped',
    }).output();
    
    // Parser la sortie
    return parsePsOutput(output);
  }
  
  static async listFiles(path: string = '.'): Promise<string[]> {
    const entries: string[] = [];
    for await (const entry of Deno.readDir(path)) {
      entries.push(entry.name);
    }
    return entries.sort();
  }
}
```

### VisionModule

```typescript
interface VisionResult {
  objects: DetectedObject[];
  text: string[];
  scene: string;
  colors: string[];
  dimensions: { width: number; height: number };
}

class VisionModule {
  static async analyzeImage(imagePath: string): Promise<VisionResult> {
    const image = await Deno.readFile(imagePath);
    
    // Appel API Vision
    const response = await fetch('https://vision.googleapis.com/v1/images:annotate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('GOOGLE_VISION_API_KEY')}`,
      },
      body: JSON.stringify({
        requests: [{
          image: { content: Buffer.from(image).toString('base64') },
          features: [
            { type: 'LABEL_DETECTION', maxResults: 10 },
            { type: 'TEXT_DETECTION', maxResults: 20 },
          ],
        }],
      }),
    });
    
    return parseVisionResponse(await response.json());
  }
}
```

### SandboxModule

```typescript
interface SandboxStatus {
  isolation_level: string;
  active_sandboxes: number;
  docker_daemon: string;
}

class SandboxModule {
  static async status(): Promise<SandboxStatus> {
    try {
      const output = await new Deno.Command('docker', {
        args: ['info', '--format', '{{.NCPU}}'],
        stdout: 'piped',
      }).output();
      
      return {
        isolation_level: 'docker',
        active_sandboxes: await this.countActiveSandboxes(),
        docker_daemon: 'running',
      };
    } catch {
      return {
        isolation_level: 'none',
        active_sandboxes: 0,
        docker_daemon: 'not running',
      };
    }
  }
  
  static async restart(): Promise<void> {
    await new Deno.Command('docker', {
      args: ['restart', 'clisis-sandbox'],
    }).output();
  }
}
```

---

## 🔌 Google Workspace Module

```typescript
class GoogleWorkspaceModule {
  // Drive
  static async listFiles(options?: ListOptions): Promise<ListFilesResult> {
    const response = await this.drive!.files.list({
      pageSize: options?.pageSize || 10,
      fields: 'nextPageToken, files(id, name, mimeType, size)',
      q: options?.q,
    });
    
    return { files: response.data.files || [] };
  }
  
  static async uploadFile(path: string): Promise<UploadResult> {
    const fileMetadata = { name: basename(path) };
    const media = {
      mimeType: mime.getType(path),
      body: await Deno.readFile(path),
    };
    
    const response = await this.drive!.files.create({
      requestBody: fileMetadata,
      media,
    });
    
    return response.data as UploadResult;
  }
  
  // Gmail
  static async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const message = [
      `To: ${options.to}`,
      `Subject: ${options.subject}`,
      '',
      options.body,
    ].join('\n');
    
    const encoded = Buffer.from(message).toString('base64');
    
    const response = await this.gmail!.users.messages.send({
      userId: 'me',
      requestBody: { raw: encoded },
    });
    
    return response.data as SendEmailResult;
  }
  
  // Calendar
  static async createEvent(options: CreateEventOptions): Promise<CreateEventResult> {
    const response = await this.calendar!.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: options.summary,
        start: { dateTime: options.start },
        end: { dateTime: options.end },
      },
    });
    
    return response.data as CreateEventResult;
  }
  
  // Sheets
  static async createSpreadsheet(title: string): Promise<CreateSheetResult> {
    const response = await this.sheets!.spreadsheets.create({
      requestBody: { properties: { title } },
    });
    
    return {
      spreadsheetId: response.data.spreadsheetId!,
      spreadsheetUrl: response.data.spreadsheetUrl!,
    };
  }
}
```

---

**Version :** 1.0.0
