import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CreativeCardsResumeData } from "../types/resume";

interface CreativePdfProps {
  data: CreativeCardsResumeData;
  headerColor: string;
  blockA: string;
  blockB: string;
  blockC: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontFamily: "Helvetica",
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  header: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    color: "#ffffff",
  },
  name: {
    fontSize: 24,
    fontWeight: 800,
  },
  role: {
    marginTop: 4,
    fontSize: 11.5,
    fontWeight: 700,
  },
  contacts: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    rowGap: 4,
  },
  contactItem: {
    width: "50%",
    fontSize: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  half: {
    width: "48.5%",
  },
  full: {
    width: "100%",
  },
  card: {
    borderRadius: 18,
    padding: 12,
  },
  title: {
    fontSize: 8,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontWeight: 700,
    marginBottom: 5,
  },
  text: {
    fontSize: 8.2,
    lineHeight: 1.38,
    color: "#334155",
  },
  listItem: {
    fontSize: 8.2,
    lineHeight: 1.35,
    color: "#334155",
    marginBottom: 3,
  },
});

export function CreativePdfDocument({
  data,
  headerColor,
  blockA,
  blockB,
  blockC,
}: CreativePdfProps) {
  return (
    <Document title={data.personal.fullName}>
      <Page size="A4" style={styles.page}>
        <View style={{ ...styles.header, backgroundColor: headerColor }}>
          <Text style={styles.name}>{data.personal.fullName}</Text>
          <Text style={styles.role}>{data.personal.title}</Text>
          <View style={styles.contacts}>
            <Text style={styles.contactItem}>
              {data.personal.city}, {data.personal.state}
            </Text>
            <Text style={styles.contactItem}>{data.personal.phone}</Text>
            <Text style={styles.contactItem}>{data.personal.email}</Text>
            <Text style={styles.contactItem}>{data.personal.linkedin}</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={{ ...styles.card, ...styles.half, backgroundColor: blockA }}>
            <Text style={{ ...styles.title, color: "#be123c" }}>Resumo / Objetivo</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
          <View style={{ ...styles.card, ...styles.half, backgroundColor: blockB }}>
            <Text style={{ ...styles.title, color: "#a16207" }}>Competencias</Text>
            {data.skills.slice(0, 6).map((item) => (
              <Text key={item} style={styles.listItem}>
                {item}
              </Text>
            ))}
          </View>
          <View style={{ ...styles.card, ...styles.full, backgroundColor: blockC }}>
            <Text style={{ ...styles.title, color: "#c2410c" }}>Projetos em Destaque</Text>
            {data.featuredProjects.map((item) => (
              <Text key={item} style={styles.listItem}>
                {item}
              </Text>
            ))}
          </View>
          <View style={{ ...styles.card, ...styles.full, backgroundColor: blockB }}>
            <Text style={{ ...styles.title, color: "#a16207" }}>Experiencia Profissional</Text>
            {data.experience.map((item) => (
              <Text key={`${item.role}-${item.company}`} style={styles.listItem}>
                {item.role} - {item.company} - {item.period}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
