USE [UserDB]
GO
/****** Object:  FullTextCatalog [FTS_Catalog]    Script Date: 11-11-2022 18:16:12 ******/
CREATE FULLTEXT CATALOG [FTS_Catalog] WITH ACCENT_SENSITIVITY = ON
GO
/****** Object:  Table [dbo].[UserDetails]    Script Date: 11-11-2022 18:16:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Phone] [varchar](10) NOT NULL,
	[StreetNumber] [varchar](150) NOT NULL,
	[City] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[UserName] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK_UserDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[GetAllSearchUsers]    Script Date: 11-11-2022 18:16:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Proc [dbo].[GetAllSearchUsers]  
 @PageNo INT ,  
 @PageSize INT ,  
 @SortOrder VARCHAR(50),
 @Seach Varchar(50)
As  
Begin  
  Select * From   (Select ROW_NUMBER() Over (  
    Order by FirstName ) AS 'RowNum', *  
         from   dbo.[UserDetails]  Where status = 0 AND (FirstName LIKE '%' + @Seach + '%' OR LastName  LIKE '%' + @Seach + '%'  OR Email  LIKE '%' + @Seach + '%')
        )t  where (t.RowNum Between ((@PageNo-1)*@PageSize +1) AND (@PageNo*@pageSize))
End  
GO
/****** Object:  StoredProcedure [dbo].[getAllUserCount]    Script Date: 11-11-2022 18:16:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Proc [dbo].[getAllUserCount]

As  

Begin  

        select count(*) from   dbo.UserDetails where status = 0

End 



GO
/****** Object:  StoredProcedure [dbo].[GetAllUsers]    Script Date: 11-11-2022 18:16:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Proc [dbo].[GetAllUsers]  
 @PageNo INT ,  
 @PageSize INT ,  
 @SortOrder VARCHAR(200)  
As  
Begin  
  Select * From   (Select ROW_NUMBER() Over (  
    Order by FirstName ) AS 'RowNum', *  
         from   dbo.[UserDetails]  where status = 0
        )t  where t.RowNum Between ((@PageNo-1)*@PageSize +1) AND (@PageNo*@pageSize)  --AND t.status = 0
End  
GO
