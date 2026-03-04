import { useState, useEffect } from "react";

const codeByService = [
  // Web Development
  [
    { type: "comment", text: "// Web Application - Server Side Rendering" },
    { type: "code", text: "import { NextRequest, NextResponse } from 'next/server';" },
    { type: "code", text: "import { db } from '@/lib/database';" },
    { type: "code", text: "import { auth } from '@/lib/auth';" },
    { type: "empty", text: "" },
    { type: "code", text: "export async function GET(req: NextRequest) {" },
    { type: "code", text: "  const session = await auth();" },
    { type: "code", text: "  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });" },
    { type: "empty", text: "" },
    { type: "code", text: "  const users = await db.user.findMany({" },
    { type: "code", text: "    where: { orgId: session.user.orgId }," },
    { type: "code", text: "    include: { profile: true, roles: true }," },
    { type: "code", text: "    orderBy: { createdAt: 'desc' }," },
    { type: "code", text: "  });" },
    { type: "empty", text: "" },
    { type: "code", text: "  return NextResponse.json({ users, total: users.length });" },
    { type: "code", text: "}" },
  ],
  // Mobile Apps
  [
    { type: "comment", text: "// Mobile App - React Native Screen" },
    { type: "code", text: "import React, { useEffect, useState } from 'react';" },
    { type: "code", text: "import { View, FlatList, Text } from 'react-native';" },
    { type: "code", text: "import { useNavigation } from '@react-navigation/native';" },
    { type: "empty", text: "" },
    { type: "code", text: "export const FeedScreen = () => {" },
    { type: "code", text: "  const [posts, setPosts] = useState([]);" },
    { type: "code", text: "  const navigation = useNavigation();" },
    { type: "empty", text: "" },
    { type: "code", text: "  useEffect(() => {" },
    { type: "code", text: "    fetch('/api/feed')" },
    { type: "code", text: "      .then(res => res.json())" },
    { type: "code", text: "      .then(data => setPosts(data.posts));" },
    { type: "code", text: "  }, []);" },
    { type: "empty", text: "" },
    { type: "code", text: "  return (" },
    { type: "code", text: "    <FlatList data={posts} renderItem={({ item }) => (" },
    { type: "code", text: "      <PostCard post={item} onPress={() => navigation.navigate('Detail', { id: item.id })} />" },
    { type: "code", text: "    )} />" },
    { type: "code", text: "  );" },
    { type: "code", text: "};" },
  ],
  // Automation
  [
    { type: "comment", text: "// Automation - Workflow Pipeline" },
    { type: "code", text: "import { Pipeline, Step } from './engine';" },
    { type: "code", text: "import { slack, sheets, email } from './integrations';" },
    { type: "empty", text: "" },
    { type: "code", text: "const pipeline = new Pipeline('daily-report');" },
    { type: "empty", text: "" },
    { type: "code", text: "pipeline.addStep(new Step('fetch', async () => {" },
    { type: "code", text: "  const rows = await sheets.getRange('Sales!A1:F100');" },
    { type: "code", text: "  return rows.filter(r => r.date === today());" },
    { type: "code", text: "}));" },
    { type: "empty", text: "" },
    { type: "code", text: "pipeline.addStep(new Step('analyze', async (data) => {" },
    { type: "code", text: "  const total = data.reduce((s, r) => s + r.amount, 0);" },
    { type: "code", text: "  return { total, count: data.length, avg: total / data.length };" },
    { type: "code", text: "}));" },
    { type: "empty", text: "" },
    { type: "code", text: "pipeline.addStep(new Step('notify', async (stats) => {" },
    { type: "code", text: "  await slack.send(`📊 Daily: $${stats.total} (${stats.count} sales)`);" },
    { type: "code", text: "  await email.send({ to: 'team@co.com', subject: 'Report', body: stats });" },
    { type: "code", text: "}));" },
    { type: "empty", text: "" },
    { type: "code", text: "pipeline.run();" },
  ],
  // AI Integration
  [
    { type: "comment", text: "// AI Integration - RAG Pipeline" },
    { type: "code", text: "import { OpenAI } from 'openai';" },
    { type: "code", text: "import { Pinecone } from '@pinecone-database/pinecone';" },
    { type: "code", text: "import { RecursiveCharacterTextSplitter } from 'langchain';" },
    { type: "empty", text: "" },
    { type: "code", text: "const ai = new OpenAI({ apiKey: process.env.OPENAI_KEY });" },
    { type: "code", text: "const vectorDB = new Pinecone({ apiKey: process.env.PINECONE_KEY });" },
    { type: "empty", text: "" },
    { type: "code", text: "export const query = async (prompt: string) => {" },
    { type: "code", text: "  const embedding = await ai.embeddings.create({" },
    { type: "code", text: "    model: 'text-embedding-3-small', input: prompt" },
    { type: "code", text: "  });" },
    { type: "empty", text: "" },
    { type: "code", text: "  const matches = await vectorDB.index('docs').query({" },
    { type: "code", text: "    vector: embedding.data[0].embedding, topK: 5" },
    { type: "code", text: "  });" },
    { type: "empty", text: "" },
    { type: "code", text: "  const context = matches.map(m => m.metadata.text).join('\\n');" },
    { type: "code", text: "  const response = await ai.chat.completions.create({" },
    { type: "code", text: "    model: 'gpt-4-turbo'," },
    { type: "code", text: "    messages: [" },
    { type: "code", text: "      { role: 'system', content: `Context:\\n${context}` }," },
    { type: "code", text: "      { role: 'user', content: prompt }" },
    { type: "code", text: "    ]," },
    { type: "code", text: "  });" },
    { type: "code", text: "  return response.choices[0].message;" },
    { type: "code", text: "};" },
  ],
];

const fileNames = ["routes/api.ts", "screens/Feed.tsx", "pipelines/report.ts", "services/rag.ts"];

const highlightSyntax = (text: string) => {
  return text
    .replace(/(import|export|const|await|async|new|return|from|if|function)/g, '<span class="text-purple-400">$1</span>')
    .replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
    .replace(/(`[^`]*`)/g, '<span class="text-green-400">$1</span>')
    .replace(/(OpenAI|Pinecone|Pipeline|Step|NextRequest|NextResponse|FlatList|View|Text)/g, '<span class="text-blue-400">$1</span>')
    .replace(/(\.[\w]+)/g, '<span class="text-yellow-400">$1</span>')
    .replace(/(\{|\}|\(|\)|\[|\])/g, '<span class="text-foreground">$1</span>');
};

export const CodePreview = ({ serviceIndex }: { serviceIndex: number }) => {
  const codeLines = codeByService[serviceIndex];
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  }, [serviceIndex]);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const currentLine = codeLines[currentLineIndex].text;

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((p) => p + 1);
      }, 25 + Math.random() * 15);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex((p) => p + 1);
        setCurrentCharIndex(0);
        setDisplayedLines((prev) => [...prev, ""]);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, codeLines]);

  const getLineColor = (index: number) => {
    if (index >= codeLines.length) return "text-foreground";
    return codeLines[index]?.type === "comment" ? "text-muted-foreground" : "text-foreground";
  };

  return (
    <div className="glass rounded-2xl overflow-hidden h-[420px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">{fileNames[serviceIndex]}</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-primary">Live</span>
        </div>
      </div>

      <div className="p-4 font-mono text-xs md:text-sm leading-relaxed overflow-y-auto h-[calc(100%-48px)]">
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className={`${getLineColor(index)} min-h-[1.5em]`}
            dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || "&nbsp;" }}
          />
        ))}
        {currentLineIndex < codeLines.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />
        )}
      </div>
    </div>
  );
};
