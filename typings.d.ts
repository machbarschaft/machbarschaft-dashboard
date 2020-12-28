declare var process: Process;

interface Process {
  env: Env;
}

interface Env {
  PROJECT_ID?: string;
  FIREBASE_API_KEY?: string;
  MAPS_API_KEY?: string;
  API_URL_SUB?: string;
}

interface GlobalEnvironment {
  process: Process;
}
