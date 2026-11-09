import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const monitoredSystems = [
  { name: 'portal', url: 'https://portal.origins-software.com' },
  { name: 'careers', url: 'https://career.origins-software.com' },
] as const;

type SystemCheck = {
  name: (typeof monitoredSystems)[number]['name'];
  reachable: boolean;
  latency: number | null;
};

async function checkSystem(
  system: (typeof monitoredSystems)[number],
): Promise<SystemCheck> {
  const start = performance.now();

  try {
    const response = await fetch(system.url, {
      cache: 'no-store',
      redirect: 'follow',
      signal: AbortSignal.timeout(5000),
    });

    return {
      name: system.name,
      reachable: response.status < 500,
      latency: Math.round(performance.now() - start),
    };
  } catch {
    return { name: system.name, reachable: false, latency: null };
  }
}

export async function GET() {
  const systems = await Promise.all(monitoredSystems.map(checkSystem));
  const reachableSystems = systems.filter(
    (system): system is SystemCheck & { latency: number } =>
      system.reachable && system.latency !== null,
  );

  const status =
    reachableSystems.length === systems.length
      ? 'NOMINAL'
      : reachableSystems.length > 0
        ? 'DEGRADED'
        : 'OFFLINE';
  const latency =
    reachableSystems.length > 0
      ? Math.round(
          reachableSystems.reduce((total, system) => total + system.latency, 0) /
            reachableSystems.length,
        )
      : 0;

  return NextResponse.json(
    { latency, status, systems },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
