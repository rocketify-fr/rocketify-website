import Container from "~/components/Container"

const HeadingTagline = ({ title, description }) => {
  return (
    <Container className="flex justify-between items-center gap-16">
      <h2 className="text-[56px] w-1/2">{title}</h2>
      <p className="w-1/2"> {description}</p>

    </Container>
  )
}

export default HeadingTagline
