# Manejo de procesos del sistema en Node.js ES Modules

Node.js proporciona acceso completo a los procesos del sistema operativo a través del módulo `process` (global) y módulos adicionales como `os`, `child_process`, y `worker_threads`. Estos permiten interactuar con el entorno de ejecución, gestionar procesos hijos y aprovechar múltiples núcleos de CPU.

## Módulo Process - Información del Proceso Actual

El objeto `process` es global en Node.js y no requiere importación. Proporciona información y control sobre el proceso actual de Node.js.

### Información Básica del Proceso

```jsx
function mostrarInfoProceso() {
  console.log("=== INFORMACIÓN DEL PROCESO NODE.JS ===");

  // Información de identificación
  console.log("ID del proceso:", process.pid);
  console.log("ID del proceso padre:", process.ppid);
  console.log("Título del proceso:", process.title);

  // Información de ejecución
  console.log("Versión de Node.js:", process.version);
  console.log("Versiones de dependencias:", process.versions);
  console.log("Plataforma:", process.platform);
  console.log("Arquitectura:", process.arch);

  // Directorios
  console.log("Directorio de trabajo actual:", process.cwd());
  console.log("Directorio del ejecutable Node.js:", process.execPath);

  // Argumentos de línea de comandos
  console.log("Argumentos recibidos:", process.argv);
  console.log("Ruta del script ejecutado:", process.argv[1]);
}

mostrarInfoProceso();
```

### Variables de Entorno

```jsx
function manejarVariablesEntorno() {
  console.log("=== VARIABLES DE ENTORNO ===");

  // Acceder a variables de entorno específicas
  console.log(
    "Entorno de ejecución (NODE_ENV):",
    process.env.NODE_ENV || "no definido"
  );
  console.log("Usuario del sistema:", process.env.USER || process.env.USERNAME);
  console.log("Directorio home:", process.env.HOME || process.env.USERPROFILE);
  console.log("Path del sistema:", process.env.PATH);

  // Establecer variables de entorno (solo para este proceso)
  process.env.MI_VARIABLE = "valor personalizado";
  console.log("Variable personalizada:", process.env.MI_VARIABLE);

  // Listar todas las variables de entorno
  console.log(
    "Total de variables de entorno:",
    Object.keys(process.env).length
  );
}

manejarVariablesEntorno();
```

### Uso de Memoria y Rendimiento

```jsx
function monitorearMemoria() {
  console.log("=== USO DE MEMORIA DEL PROCESO ===");

  const usoMemoria = process.memoryUsage();

  console.log(
    "RSS (Resident Set Size):",
    Math.round(usoMemoria.rss / 1024 / 1024) + " MB"
  );
  console.log(
    "Heap Total:",
    Math.round(usoMemoria.heapTotal / 1024 / 1024) + " MB"
  );
  console.log(
    "Heap Usado:",
    Math.round(usoMemoria.heapUsed / 1024 / 1024) + " MB"
  );
  console.log(
    "External:",
    Math.round(usoMemoria.external / 1024 / 1024) + " MB"
  );

  // Uso de CPU
  const usoCPU = process.cpuUsage();
  console.log("Uso de CPU (user):", usoCPU.user + " microseconds");
  console.log("Uso de CPU (system):", usoCPU.system + " microseconds");
}

function iniciarMonitoreoContinuo() {
  // Monitorear memoria cada 5 segundos
  setInterval(() => {
    const heapUsado = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    console.log(`Heap usado: ${heapUsado} MB`);
  }, 5000);
}

monitorearMemoria();
// iniciarMonitoreoContinuo();
```

## Módulo OS - Información del Sistema Operativo

El módulo `os` proporciona información detallada sobre el sistema operativo y recursos del sistema.

```jsx
import os from "os";

function mostrarInfoSistema() {
  console.log("=== INFORMACIÓN DEL SISTEMA OPERATIVO ===");

  // Información básica del sistema
  console.log("Sistema operativo:", os.platform());
  console.log("Tipo de sistema:", os.type());
  console.log("Versión del sistema:", os.release());
  console.log("Arquitectura:", os.arch());
  console.log(
    "Tiempo de actividad del sistema:",
    Math.round(os.uptime() / 3600) + " horas"
  );

  // Información de memoria
  console.log(
    "Memoria total:",
    Math.round(os.totalmem() / 1024 / 1024 / 1024) + " GB"
  );
  console.log("Memoria libre:", Math.round(os.freemem() / 1024 / 1024) + " MB");
  console.log(
    "Porcentaje de memoria libre:",
    Math.round((os.freemem() / os.totalmem()) * 100) + "%"
  );

  // Información de CPU
  const cpus = os.cpus();
  console.log("Número de CPUs:", cpus.length);
  console.log("Modelo de CPU:", cpus[0].model);
  console.log("Velocidad de CPU:", cpus[0].speed + " MHz");

  // Información de red
  console.log("Hostname:", os.hostname());
  console.log("Interfaces de red:");
  const interfaces = os.networkInterfaces();

  Object.entries(interfaces).forEach(([nombre, direcciones]) => {
    direcciones.forEach((direccion) => {
      if (direccion.family === "IPv4" && !direccion.internal) {
        console.log(`  ${nombre}: ${direccion.address}`);
      }
    });
  });

  // Información del usuario
  console.log("Directorio home:", os.homedir());
  console.log("Directorio temporal:", os.tmpdir());
  console.log("Usuario actual:", os.userInfo().username);
}

mostrarInfoSistema();
```

## Módulo Child Process - Ejecución de Procesos Hijos

El módulo `child_process` permite ejecutar comandos del sistema y otros programas desde Node.js.

### Ejecución Sincrónica de Comandos

```jsx
import { execSync } from "child_process";

function ejecutarComandosSincronos() {
  try {
    console.log("=== EJECUCIÓN SINCRÓNICA DE COMANDOS ===");

    // Ejecutar comando simple
    const resultado = execSync("ls -la", { encoding: "utf8" });
    console.log("Listado de directorio:");
    console.log(resultado);

    // Ejecutar comando con parámetros
    const fecha = execSync("date", { encoding: "utf8" }).trim();
    console.log("Fecha del sistema:", fecha);

    // Obtener información del sistema
    const memoriaLibre = execSync("free -h", { encoding: "utf8" });
    console.log("Memoria libre:");
    console.log(memoriaLibre);
  } catch (error) {
    console.error("Error al ejecutar comando:", error.message);
  }
}

ejecutarComandosSincronos();
```

### Ejecución Asincrónica de Comandos

```jsx
import { exec } from "child_process";

function ejecutarComandoAsincrono(comando) {
  return new Promise((resolve, reject) => {
    console.log(`Ejecutando comando: ${comando}`);

    exec(comando, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error ejecutando comando: ${error.message}`);
        reject(error);
        return;
      }

      if (stderr) {
        console.error(`Error estándar: ${stderr}`);
      }

      console.log("Salida del comando:");
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function demostracionComandosAsincronos() {
  try {
    await ejecutarComandoAsincrono("pwd");
    await ejecutarComandoAsincrono("whoami");
    await ejecutarComandoAsincrono('echo "Hola desde Node.js"');
  } catch (error) {
    console.error("Error en demostración:", error.message);
  }
}

demostracionComandosAsincronos();
```

### Spawn para Comandos con Salida en Tiempo Real

```jsx
import { spawn } from "child_process";

function ejecutarComandoTiempoReal(comando, argumentos = []) {
  return new Promise((resolve, reject) => {
    console.log(`Ejecutando: ${comando} ${argumentos.join(" ")}`);

    const proceso = spawn(comando, argumentos);
    let salidaCompleta = "";

    proceso.stdout.on("data", (data) => {
      const salida = data.toString();
      salidaCompleta += salida;
      console.log("Salida:", salida.trim());
    });

    proceso.stderr.on("data", (data) => {
      console.error("Error:", data.toString().trim());
    });

    proceso.on("close", (codigo) => {
      console.log(`Proceso terminado con código: ${codigo}`);
      resolve(salidaCompleta);
    });

    proceso.on("error", (error) => {
      console.error("Error en el proceso:", error.message);
      reject(error);
    });
  });
}

async function demostracionSpawn() {
  try {
    // Comando que produce salida continua
    await ejecutarComandoTiempoReal("find", [
      ".",
      "-name",
      "*.js",
      "-type",
      "f",
    ]);

    // Comando con pipes (solo Unix)
    // await ejecutarComandoTiempoReal('ps', ['aux', '|', 'grep', 'node']);
  } catch (error) {
    console.error("Error en spawn:", error.message);
  }
}

demostracionSpawn();
```

## Módulo Worker Threads - Hilos de Trabajo

Para operaciones intensivas de CPU, los worker threads permiten ejecutar código JavaScript en paralelo.

```jsx
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

function tareaIntensivaCPU(numero) {
  // Simular una tarea que consume CPU
  let resultado = 0;
  for (let i = 0; i < numero; i++) {
    resultado += Math.sqrt(i) * Math.sin(i);
  }
  return resultado;
}

if (isMainThread) {
  // Código del hilo principal
  async function ejecutarConWorkerThreads() {
    console.log("=== WORKER THREADS DEMOSTRACIÓN ===");

    const tareas = [10000000, 20000000, 30000000];
    const workers = [];

    for (let i = 0; i < tareas.length; i++) {
      const worker = new Worker(new URL(import.meta.url), {
        workerData: { valor: tareas[i], id: i + 1 },
      });

      workers.push(
        new Promise((resolve, reject) => {
          worker.on("message", resolve);
          worker.on("error", reject);
          worker.on("exit", (code) => {
            if (code !== 0) {
              reject(new Error(`Worker se detuvo con código ${code}`));
            }
          });
        })
      );
    }

    console.log("Ejecutando tareas intensivas en workers paralelos...");
    const inicio = Date.now();

    try {
      const resultados = await Promise.all(workers);
      const duracion = Date.now() - inicio;

      console.log(`Todas las tareas completadas en ${duracion}ms`);
      resultados.forEach((resultado, index) => {
        console.log(`Worker ${index + 1}: ${resultado}`);
      });
    } catch (error) {
      console.error("Error en workers:", error.message);
    }
  }

  ejecutarConWorkerThreads();
} else {
  // Código del worker thread
  const resultado = tareaIntensivaCPU(workerData.valor);
  parentPort.postMessage(`Tarea ${workerData.id} completada: ${resultado}`);
}
```

## Manejo de Señales del Sistema

```jsx
function configurarManejoSeñales() {
  console.log("=== MANEJO DE SEÑALES DEL SISTEMA ===");
  console.log("Proceso ID:", process.pid);
  console.log("Envía señales con: kill -SEÑAL", process.pid);

  // Manejar señal de interrupción (Ctrl+C)
  process.on("SIGINT", () => {
    console.log("\\nRecibida señal SIGINT (Ctrl+C). Cerrando limpiamente...");
    // Realizar limpieza antes de salir
    setTimeout(() => {
      console.log("Limpieza completada. Saliendo.");
      process.exit(0);
    }, 1000);
  });

  // Manejar señal de terminación
  process.on("SIGTERM", () => {
    console.log("Recibida señal SIGTERM. Realizando shutdown graceful...");
    // Cerrar conexiones, guardar estado, etc.
    process.exit(0);
  });

  // Manejar cierre inesperado
  process.on("uncaughtException", (error) => {
    console.error("Error no capturado:", error);
    // En producción, podrías registrar el error y continuar
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Promise rechazada no manejada:", reason);
    // En producción, registrar y posiblemente continuar
  });

  // Mantener el proceso activo
  console.log("Proceso ejecutándose. Presiona Ctrl+C para terminar.");
}

configurarManejoSeñales();
```

## Ejemplo Práctico: Monitor del Sistema

Vamos a crear un monitor completo del sistema que combine todos los conceptos:

```jsx
import os from "os";
import { exec } from "child_process";

class MonitorSistema {
  constructor() {
    this.datosHistoricos = [];
    this.intervaloMonitoreo = null;
  }

  obtenerUsoCPU() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach((cpu) => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });

    return {
      total: totalTick,
      idle: totalIdle,
      uso: 100 - Math.round((100 * totalIdle) / totalTick),
    };
  }

  obtenerEstadoMemoria() {
    const total = os.totalmem();
    const libre = os.freemem();
    const usado = total - libre;

    return {
      total: Math.round(total / 1024 / 1024),
      libre: Math.round(libre / 1024 / 1024),
      usado: Math.round(usado / 1024 / 1024),
      porcentaje: Math.round((usado / total) * 100),
    };
  }

  obtenerEstadoSistema() {
    const memoria = this.obtenerEstadoMemoria();
    const cpu = this.obtenerUsoCPU();

    return {
      timestamp: new Date().toISOString(),
      plataforma: os.platform(),
      tiempoActividad: Math.round(os.uptime() / 3600),
      memoria: memoria,
      cpu: cpu,
      cargaSistema: os.loadavg(),
      procesosNode: {
        memoria: Math.round(process.memoryUsage().rss / 1024 / 1024),
        pid: process.pid,
      },
    };
  }

  iniciarMonitoreo(intervalo = 5000) {
    console.log("Iniciando monitor del sistema...");
    console.log("Intervalo de monitoreo:", intervalo + "ms");

    this.intervaloMonitoreo = setInterval(() => {
      const estado = this.obtenerEstadoSistema();
      this.datosHistoricos.push(estado);

      // Mantener solo los últimos 100 registros
      if (this.datosHistoricos.length > 100) {
        this.datosHistoricos.shift();
      }

      this.mostrarEstadoActual(estado);
    }, intervalo);
  }

  detenerMonitoreo() {
    if (this.intervaloMonitoreo) {
      clearInterval(this.intervaloMonitoreo);
      console.log("Monitor detenido");
    }
  }

  mostrarEstadoActual(estado) {
    console.log("\\n--- ESTADO DEL SISTEMA ---");
    console.log("Hora:", new Date().toLocaleTimeString());
    console.log(
      `Memoria: ${estado.memoria.usado}MB / ${estado.memoria.total}MB (${estado.memoria.porcentaje}%)`
    );
    console.log(`CPU: ${estado.cpu.uso}% de uso`);
    console.log(
      `Carga del sistema: ${estado.cargaSistema[0].toFixed(2)} (1min)`
    );
    console.log(`Proceso Node: ${estado.procesosNode.memoria}MB RSS`);
  }

  generarReporte() {
    if (this.datosHistoricos.length === 0) {
      console.log("No hay datos de monitoreo disponibles");
      return;
    }

    const usoCPUPromedio =
      this.datosHistoricos.reduce((sum, dato) => sum + dato.cpu.uso, 0) /
      this.datosHistoricos.length;

    const memoriaPromedio =
      this.datosHistoricos.reduce(
        (sum, dato) => sum + dato.memoria.porcentaje,
        0
      ) / this.datosHistoricos.length;

    console.log("\\n=== REPORTE DE MONITOREO ===");
    console.log(
      "Período de monitoreo:",
      this.datosHistoricos.length,
      "muestras"
    );
    console.log("Uso de CPU promedio:", usoCPUPromedio.toFixed(2) + "%");
    console.log("Uso de memoria promedio:", memoriaPromedio.toFixed(2) + "%");
    console.log(
      "Tiempo máximo de actividad:",
      this.datosHistoricos[this.datosHistoricos.length - 1].tiempoActividad +
        " horas"
    );
  }

  ejecutarComandoPersonalizado(comando) {
    return new Promise((resolve, reject) => {
      exec(comando, { encoding: "utf8" }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout || stderr);
      });
    });
  }
}

// Uso del monitor
async function demostracionMonitor() {
  const monitor = new MonitorSistema();

  // Configurar manejo de señales
  process.on("SIGINT", () => {
    console.log("\\nDeteniendo monitor...");
    monitor.detenerMonitoreo();
    monitor.generarReporte();
    process.exit(0);
  });

  // Iniciar monitoreo
  monitor.iniciarMonitoreo(3000);

  // Ejecutar algunos comandos después de 15 segundos
  setTimeout(async () => {
    try {
      console.log("\\n--- EJECUTANDO COMANDOS DEL SISTEMA ---");
      const espacioDisco = await monitor.ejecutarComandoPersonalizado("df -h");
      console.log("Espacio en disco:");
      console.log(espacioDisco);
    } catch (error) {
      console.error("Error al ejecutar comando:", error.message);
    }
  }, 15000);

  // Detener automáticamente después de 30 segundos para la demostración
  setTimeout(() => {
    console.log("\\n--- DEMOSTRACIÓN COMPLETADA ---");
    monitor.detenerMonitoreo();
    monitor.generarReporte();
    process.exit(0);
  }, 30000);
}

// Ejecutar la demostración
// demostracionMonitor();
```

## Gestión de Procesos en Producción

```jsx
import cluster from "cluster";
import os from "os";

if (cluster.isPrimary) {
  console.log("=== CLUSTER MODE - PROCESS MANAGER ===");
  console.log("Proceso principal PID:", process.pid);
  console.log("CPUs disponibles:", os.cpus().length);

  // Crear un worker por CPU
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Manejar eventos de workers
  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} iniciado`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} terminado`);
    console.log("Iniciando nuevo worker...");
    cluster.fork();
  });

  // Manejar señales para shutdown graceful
  process.on("SIGTERM", () => {
    console.log("Recibido SIGTERM, cerrando workers...");
    for (const id in cluster.workers) {
      cluster.workers[id].kill("SIGTERM");
    }
  });
} else {
  // Código de los workers
  console.log(`Worker ${process.pid} ejecutándose`);

  // Simular una aplicación web/API
  const http = await import("http");
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Respuesta desde worker ${process.pid}\\n`);
  });

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} escuchando en puerto 3000`);
  });
}
```

## Conclusión

El manejo de procesos en Node.js con ES Modules proporciona capacidades completas para:

- Monitorear y controlar el proceso actual de Node.js
- Obtener información detallada del sistema operativo
- Ejecutar comandos del sistema y otros programas
- Aprovechar múltiples núcleos de CPU con worker threads
- Crear aplicaciones en cluster para producción
- Manejar señales del sistema para shutdown graceful

Estas capacidades son esenciales para construir aplicaciones robustas que necesitan interactuar con el sistema operativo, gestionar recursos eficientemente y escalar en entornos de producción.
