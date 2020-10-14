USE [Exposoftware]
GO

/****** Object:  Table [dbo].[Docente]    Script Date: 7/5/2020 08:34:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Docente](
	[Identificacion] [varchar](50) NOT NULL,
	[Nombre] [nvarchar](max) NOT NULL,
	[Descripcion] [nvarchar](max) NOT NULL,
	[Tipo] [nvarchar](50) NOT NULL,
	[Asignatura] [varchar](max) NULL,
 CONSTRAINT [PK_Docente] PRIMARY KEY CLUSTERED 
(
	[Identificacion] ASC
	
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

