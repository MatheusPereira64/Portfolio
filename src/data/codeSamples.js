/** Exemplos da caixa de código do início. São ilustrativos, não trechos de projetos privados. */
export const CODE_SAMPLES = [
  {
    id: 'react',
    label: 'React',
    file: 'useMachineStatus.ts',
    lang: 'ts',
    footer: 'Custom Hooks · WebSocket · TypeScript',
    code: `import { useEffect, useState } from 'react'

export function useMachineStatus(lineId: string) {
  const [status, setStatus] = useState<'ok' | 'alert'>('ok')

  useEffect(() => {
    const socket = new WebSocket(\`/ws/lines/\${lineId}\`)
    socket.onmessage = (event) => setStatus(JSON.parse(event.data).status)
    return () => socket.close()
  }, [lineId])

  return status
}`,
  },
  {
    id: 'vue',
    label: 'Vue',
    file: 'OeeCard.vue',
    lang: 'ts',
    footer: 'Composition API · computed · Dashboards',
    code: `<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ oee: number }>()

const level = computed(() =>
  props.oee >= 0.85 ? 'ótimo' : props.oee >= 0.6 ? 'atenção' : 'crítico'
)
</script>

<template>
  <article class="oee-card">{{ (props.oee * 100).toFixed(1) }}% · {{ level }}</article>
</template>`,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    file: 'oee.ts',
    lang: 'ts',
    footer: 'Tipos · Indústria 4.0 · OEE',
    code: `type Shift = {
  plannedMinutes: number
  runMinutes: number
  idealCycleSeconds: number
  totalUnits: number
  goodUnits: number
}

// OEE = disponibilidade × desempenho × qualidade
export function oee(shift: Shift): number {
  const availability = shift.runMinutes / shift.plannedMinutes
  const performance = (shift.idealCycleSeconds * shift.totalUnits) / (shift.runMinutes * 60)
  const quality = shift.goodUnits / shift.totalUnits
  return availability * performance * quality
}`,
  },
  {
    id: 'python',
    label: 'Python',
    file: 'parametros.py',
    lang: 'py',
    footer: 'pandas · Análise de dados · IA',
    code: `import pandas as pd

def sugerir_parametros(historico: pd.DataFrame) -> dict:
    """Média dos parâmetros nos lotes com menos defeitos."""
    melhores = historico.nsmallest(20, "taxa_defeitos")
    colunas = ["temperatura", "pressao", "velocidade"]
    return melhores[colunas].mean().round(2).to_dict()


if __name__ == "__main__":
    dados = pd.read_csv("producao.csv")
    print(sugerir_parametros(dados))`,
  },
  {
    id: 'node',
    label: 'Node',
    file: 'machines.routes.js',
    lang: 'js',
    footer: 'Express · REST API · PostgreSQL',
    code: `import { Router } from 'express'
import { db } from './db.js'

export const machines = Router()

machines.get('/machines/:id/oee', async (req, res) => {
  const { rows } = await db.query(
    'SELECT shift, oee FROM oee_by_shift WHERE machine_id = $1 ORDER BY shift DESC LIMIT 7',
    [req.params.id]
  )
  if (rows.length === 0) return res.status(404).json({ error: 'Máquina não encontrada' })
  res.json(rows)
})`,
  },
  {
    id: 'docker',
    label: 'Docker',
    file: 'docker-compose.yml',
    lang: 'yaml',
    footer: 'Docker Compose · PostgreSQL · Redis',
    code: `services:
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:app@db:5432/factory
    depends_on: [db, cache]
  db:
    image: postgres:17
    volumes: [pgdata:/var/lib/postgresql/data]
  cache:
    image: redis:7

volumes:
  pgdata:`,
  },
  {
    id: 'n8n',
    label: 'n8n',
    file: 'alerta-parada.json',
    lang: 'json',
    footer: 'Automação · Webhooks · Integrações',
    code: `{
  "name": "Alerta de parada de máquina",
  "nodes": [
    { "name": "Webhook", "type": "n8n-nodes-base.webhook" },
    {
      "name": "Parada > 10 min?",
      "type": "n8n-nodes-base.if",
      "parameters": { "conditions": { "number": [{ "value1": "={{$json.minutos}}", "operation": "larger", "value2": 10 }] } }
    },
    { "name": "Avisar manutenção", "type": "n8n-nodes-base.emailSend" }
  ],
  "connections": { "Webhook": { "main": [[{ "node": "Parada > 10 min?" }]] } }
}`,
  },
]

const KEYWORDS = {
  ts: /\b(import|from|export|function|const|let|return|type|new|if|async|await|setup|lang|computed)\b/g,
  js: /\b(import|from|export|function|const|let|return|new|if|async|await)\b/g,
  py: /\b(import|def|return|if|for|in|as|from|print)\b/g,
  yaml: /^(\s*[\w-]+)(?=:)/gm,
  json: /("[\w\s>?.-]+")(?=\s*:)/g,
}

/** Divide o código em linhas de tokens: comentário (c), string (s), palavra-chave (k), número (n). */
export function highlight(code, lang) {
  const pattern = new RegExp(
    [
      lang === 'py' || lang === 'yaml' ? '#.*$' : '\\/\\/.*$',
      lang === 'py' ? '"""[\\s\\S]*?"""' : null,
      '"(?:[^"\\\\]|\\\\.)*"',
      "'(?:[^'\\\\]|\\\\.)*'",
      '`(?:[^`\\\\]|\\\\.)*`',
      KEYWORDS[lang].source,
      '\\b\\d+(?:\\.\\d+)?\\b',
    ]
      .filter(Boolean)
      .join('|'),
    'gm'
  )
  return code.split('\n').map((line) => {
    const parts = []
    let last = 0
    for (const match of line.matchAll(pattern)) {
      const [text] = match
      if (!text) continue
      if (match.index > last) parts.push({ text: line.slice(last, match.index) })
      const kind = /^(\/\/|#)/.test(text)
        ? 'c'
        : /^["'`]/.test(text)
          ? lang === 'json' && /"\s*$/.test(text) && line.slice(match.index + text.length).trimStart().startsWith(':')
            ? 'p'
            : 's'
          : /^\d/.test(text)
            ? 'n'
            : 'k'
      parts.push({ text, kind })
      last = match.index + text.length
    }
    if (last < line.length) parts.push({ text: line.slice(last) })
    return parts
  })
}
