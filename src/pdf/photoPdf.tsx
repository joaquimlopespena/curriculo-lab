import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { PhotoResumeData } from "../types/resume";

interface PhotoPdfProps {
  data: PhotoResumeData;
  asideColor: string;
  bodyBackground: string;
  pillColor: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontFamily: "Helvetica",
    fontSize: 8.4,
  },
  layout: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  aside: {
    width: 188,
    paddingHorizontal: 18,
    paddingVertical: 20,
    color: "#ffffff",
    justifyContent: "space-between",
  },
  photoPill: {
    borderRadius: 999,
    padding: 5,
    alignSelf: "flex-start",
  },
  photo: {
    width: 78,
    height: 78,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  name: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1.05,
  },
  role: {
    marginTop: 4,
    fontSize: 10,
    color: "#ffffff",
    opacity: 0.85,
  },
  asideBlock: {
    marginTop: 14,
  },
  asideText: {
    fontSize: 8.2,
    lineHeight: 1.45,
    marginBottom: 3,
  },
  asideTitle: {
    fontSize: 7.2,
    letterSpacing: 2.8,
    textTransform: "uppercase",
    opacity: 0.75,
    marginBottom: 6,
  },
  main: {
    width: 407,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 12,
  },
  title: {
    fontSize: 8,
    letterSpacing: 2.6,
    textTransform: "uppercase",
    color: "#64748b",
    fontWeight: 700,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 8.3,
    lineHeight: 1.42,
    color: "#334155",
  },
  expItem: {
    marginBottom: 8,
  },
  expRole: {
    fontSize: 8.8,
    fontWeight: 800,
    color: "#0f172a",
  },
  expMeta: {
    fontSize: 7.8,
    color: "#64748b",
    marginBottom: 2,
  },
  bottomRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  bottomCol: {
    width: "50%",
  },
  miniItem: {
    marginBottom: 6,
  },
  miniTitle: {
    fontSize: 8.2,
    fontWeight: 800,
    color: "#0f172a",
  },
  miniText: {
    fontSize: 7.8,
    lineHeight: 1.32,
    color: "#475569",
  },
});

export function PhotoPdfDocument({ data, asideColor, bodyBackground, pillColor }: PhotoPdfProps) {
  const highlights = [
    "Supervisao de equipe operacional.",
    "Controle de frota e roteirizacao.",
    "Seguranca e disciplina de execucao.",
  ];

  return (
    <Document title={data.personal.fullName}>
      <Page size="A4" style={styles.page}>
        <View style={styles.layout}>
          <View style={{ ...styles.aside, backgroundColor: asideColor }}>
            <View style={{ ...styles.photoPill, backgroundColor: pillColor }}>
              <Image src={data.photoUrl} style={styles.photo} />
            </View>
            <Text style={styles.name}>{data.personal.fullName}</Text>
            <Text style={styles.role}>{data.personal.title}</Text>

            <View style={styles.asideBlock}>
              <Text style={styles.asideText}>{data.personal.phone}</Text>
              <Text style={styles.asideText}>{data.personal.email}</Text>
              <Text style={styles.asideText}>
                {data.personal.city}, {data.personal.state}
              </Text>
              <Text style={styles.asideText}>{data.personal.linkedin}</Text>
            </View>

            <View style={styles.asideBlock}>
              <Text style={styles.asideTitle}>Competencias</Text>
              {data.skills.slice(0, 6).map((item) => (
                <Text key={item} style={styles.asideText}>
                  {item}
                </Text>
              ))}
            </View>

            <View style={styles.asideBlock}>
              <Text style={styles.asideTitle}>Idiomas</Text>
              {data.languages.map((item) => (
                <Text key={`${item.name}-${item.level}`} style={styles.asideText}>
                  {item.name} - {item.level}
                </Text>
              ))}
            </View>
          </View>

          <View style={{ ...styles.main, backgroundColor: bodyBackground }}>
            <View style={styles.section}>
              <Text style={styles.title}>Resumo / Objetivo</Text>
              <Text style={styles.paragraph}>{data.summary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.title}>Experiencia Profissional</Text>
              {data.experience.slice(0, 2).map((item) => (
                <View key={`${item.role}-${item.company}`} style={styles.expItem} wrap={false}>
                  <Text style={styles.expRole}>{item.role}</Text>
                  <Text style={styles.expMeta}>
                    {item.company} | {item.period}
                  </Text>
                  <Text style={styles.paragraph}>{item.description}</Text>
                </View>
              ))}
            </View>

            <View style={styles.bottomRow}>
              <View style={styles.bottomCol}>
                <Text style={styles.title}>Formacao Academica</Text>
                {data.education.slice(0, 2).map((item) => (
                  <View key={`${item.degree}-${item.institution}`} style={styles.miniItem}>
                    <Text style={styles.miniTitle}>{item.degree}</Text>
                    <Text style={styles.miniText}>{item.institution}</Text>
                    <Text style={styles.miniText}>Conclusao: {item.conclusion}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.bottomCol}>
                <Text style={styles.title}>Destaques</Text>
                {highlights.map((item) => (
                  <Text key={item} style={{ ...styles.miniText, marginBottom: 5 }}>
                    {item}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
