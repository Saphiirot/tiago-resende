// ⚠️ DADOS FICTÍCIOS — títulos e descrições de exemplo. Sem ficheiros de vídeo associados.
import type { Video } from "@/lib/types";

export const demoVideos: Video[] = [
  { id: "demo-vid-01", title: "Remada com barra — execução", category: "Execução", durationSeconds: 94, muscleGroup: "Costas", thumbnail: null, visibility: "clientes", description: "Exemplo de descrição: posição de partida, trajetória da barra e erros comuns." },
  { id: "demo-vid-02", title: "Puxada à frente — pega e amplitude", category: "Execução", durationSeconds: 71, muscleGroup: "Costas", thumbnail: null, visibility: "clientes", description: "Exemplo de descrição: largura da pega e controlo da descida." },
  { id: "demo-vid-03", title: "Agachamento livre — profundidade", category: "Execução", durationSeconds: 128, muscleGroup: "Pernas", thumbnail: null, visibility: "clientes", description: "Exemplo de descrição: posição dos pés, joelhos e tronco." },
  { id: "demo-vid-04", title: "Peso morto romeno", category: "Execução", durationSeconds: null, muscleGroup: "Glúteos", thumbnail: null, visibility: "clientes", description: "Exemplo de descrição: dobradiça da anca e alinhamento da coluna." },
  { id: "demo-vid-05", title: "Supino inclinado com halteres", category: "Execução", durationSeconds: 86, muscleGroup: "Peito", thumbnail: null, visibility: "clientes", description: "Exemplo de descrição: inclinação do banco e trajetória." },
  { id: "demo-vid-06", title: "Prancha — alinhamento", category: "Execução", durationSeconds: 45, muscleGroup: "Core", thumbnail: null, visibility: "clientes", description: "Exemplo de descrição: posição da bacia e respiração." },
  { id: "demo-vid-07", title: "Mobilidade de anca — antes de pernas", category: "Mobilidade", durationSeconds: 300, thumbnail: null, visibility: "clientes", description: "Exemplo de descrição: sequência curta para preparar o treino de pernas." },
  { id: "demo-vid-08", title: "Aquecimento geral de tronco superior", category: "Aquecimento", durationSeconds: null, thumbnail: null, visibility: "clientes", description: "Exemplo de descrição: ativação de ombros e escápulas." },
  { id: "demo-vid-09", title: "Bastidores de uma sessão", category: "Bastidores", durationSeconds: null, thumbnail: null, visibility: "publico", description: "Exemplo de descrição: espaço para conteúdo editorial." },
];

export function getDemoVideo(id: string) {
  return demoVideos.find((v) => v.id === id);
}
